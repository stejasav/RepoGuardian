const path = require("path");
const fs = require("fs/promises");
const Handlebars = require("handlebars");

class ReportGenerator{
  constructor(obj){
    this.owner = obj.owner,
    this.repo = obj.repo,
    this.findings = obj.findings,
    this.totalFiles = obj.totalFiles;
  }

  async generateReport(){
    this.sortFindings();
    const reportObject = this.buildReportObject();
    const html = await this.compileTemplate(reportObject);
    await this.saveReport(html);
  }

  sortFindings(){
    const severityOrder = {
      HIGH : 1,
      MEDIUM: 2,
      LOW: 3
    }
    this.findings.sort((a,b)=>{
      return severityOrder[a.severity]-severityOrder[b.severity];
    })
  }

  generateSummary(){
    const summary = {
      totalFiles : this.totalFiles,
      totalFindings : this.findings.length,
      high : 0,
      medium : 0,
      low: 0
    }
    for(const finding of this.findings){
      switch (finding.severity) {
        case "HIGH":
          summary.high++;
          break;

        case "MEDIUM":
          summary.medium++;
          break;

        case "LOW":
          summary.low++;
          break;
      }
    }
    return summary;
  }

  buildReportObject(){
    const summary = this.generateSummary();
    return {
      metadata: {
        owner: this.owner,
        repositoryName: this.repo,
        totalFiles: this.totalFiles
      },
      summary,
      findings : this.findings
    };
  }

  async compileTemplate(reportObject){
    const filePath = path.join(__dirname, "../templates/report.hbs");
    const source = await fs.readFile(filePath, "utf-8");
    const template = Handlebars.compile(source);
    return template(reportObject)
  }

  async saveReport(html){
    const reportDir = path.join(__dirname, "../reports");
    await fs.mkdir(reportDir,{recursive: true});
    const files = await fs.readdir(reportDir);
    const reportFiles = files.filter(file =>
      file.startsWith("security-report-") &&
      file.endsWith(".html")
    );
    const reportNumber = reportFiles.length + 1;
    const fileName = `security-report-${reportNumber}.html`;
    const outputPath = path.join(reportDir, fileName);
    await fs.writeFile(outputPath, html, "utf8");
    console.log(`\nReport generated successfully!`);
    console.log(`Location: ${outputPath}`);
  }
}

module.exports = ReportGenerator;