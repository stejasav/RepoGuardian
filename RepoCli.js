//RepoCli.js
const axios = require("axios");
const IGNORED_DIRECTORIES = require('./constants/ignoredDirectories');
const IGNORED_FILES = require('./constants/ignoreFiles');
const IGNORED_EXTENSIONS = require("./constants/ignoredExtensions");
const path = require('path');
const { analyseCode } = require('./services/AIService')
const ReportGenerator = require('./services/ReportGenerator')

class RepoCli{
  constructor(obj){
    this.owner = obj.owner,
    this.repo = obj.repo,
    this.files = [],
    this.findings = []
  }

  async init(){
    const repoData = await this.getRepoData();
    await this.traverseRepository(repoData);
    await this.scanRepo(this.files);
    const report = new ReportGenerator({
      owner: this.owner,
      repo: this.repo,
      findings: this.findings,
      totalFiles: this.files.length
    })
    await report.generateReport();
  }

  async getRepoData(){
    const config = {
      method : "get",
      url : `https://api.github.com/repos/${this.owner}/${this.repo}/contents`
    }
    console.log("fetching Data.....");
    const response = await this.makeApiCall(config);
    console.log("Data Fetched Successfully.....");
    if(!response?.data){
      console.log("No files available");
      process.exit(1);
    }
    const result = response.data;
    return result;
  }

  async traverseRepository(repoData){
    for(const data of repoData){
      if(data.type === "file"){
        this.files.push({
          path : data.path,
          downloadURL : data.download_url
        });
      }else if(data.type === "dir"){
        if(IGNORED_DIRECTORIES.includes(data.name)){
          continue;
        }
        const config = {
          method : "get",
          url : data.url
        }
        const response = await this.makeApiCall(config);
        await this.traverseRepository(response.data);
      }
    }
  }

  async scanRepo(files){
    for(const file of files){
      const fileName = path.basename(file.path);
      const extension = path.extname(file.path).toLowerCase();
      console.log("fileName", fileName);

      if(IGNORED_FILES.includes(fileName)){
        console.log(fileName, " skipped");
        continue;
      }
      if (IGNORED_EXTENSIONS.includes(extension)) {
          console.log(`${fileName} skipped (extension)`);
          continue;
      }
      
      const config = {
        method : "get",
        url : file.downloadURL
      }
      const response = await this.makeApiCall(config);
      const finding = await analyseCode({
        filePath : file.path,
        code: response.data
      });
      if (finding.length > 0) {
        this.findings.push(...finding);
      }
    }
  }

  async makeApiCall(config){
    try{
      const response = await axios(config);
      return response;
    }catch(err){
      console.log("Status:", err.response?.status);
      console.log("Message:", err.response?.data);
      console.log("URL:", config.url);
      throw new Error("GitHub API request failed");
    }
  }
}

module.exports = RepoCli;