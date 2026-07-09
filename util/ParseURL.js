function ParseURL(githubUrl){
  const url = new URL(githubUrl);
  const part = url.pathname.split("/").filter(Boolean);
  return {
    owner : part[0],
    repo : part[1]
  }
}

module.exports = ParseURL;