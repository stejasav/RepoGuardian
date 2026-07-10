# 🛡️ RepoGuardian

> AI-powered GitHub Repository Security Scanner

RepoGuardian is a lightweight CLI tool that scans any **public GitHub repository**, analyzes its source code using **Google Gemini AI**, detects potential security vulnerabilities, and generates a beautiful, professional HTML security report.

Instead of manually reviewing hundreds of files, RepoGuardian automates the entire process—from fetching the repository to generating a detailed security audit.

---

# ✨ Features

- 🔍 Scan any public GitHub repository
- 🤖 AI-powered security analysis using Google Gemini
- 🔐 Detects:
  - Hardcoded API Keys
  - Secrets & Tokens
  - JWT Secrets
  - Database Credentials
  - Hardcoded Passwords
  - Dangerous TODO/FIXME Comments
  - Weak Authentication
  - Weak Cryptography
  - Insecure Configurations
  - Exposed Credentials
- 📊 Generates a clean and professional HTML security report
- 🚨 Categorizes findings into:
  - HIGH
  - MEDIUM
  - LOW
- 📁 Automatically versions reports
- ⚡ Easy-to-use CLI

---

# 📦 Installation

Install globally:

```bash
npm install -g @stejasav/repoguardian
```

Or use directly with **npx** (no installation required):

```bash
npx @stejasav/repoguardian https://github.com/owner/repository
```

---

# 📋 Requirements

- Node.js v18 or later
- A Google Gemini API Key

Generate an API key from:

https://aistudio.google.com/app/apikey

---

# ⚙️ Configuration

Create a `.env` file inside the directory where you'll run RepoGuardian.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Example project structure:

```
MyProject/
│
├── .env
├── package.json
└── reports/
```

> **Important**
>
> Never commit your `.env` file or API key to GitHub.

---

# 🚀 Usage

Scan a public GitHub repository by providing its URL.

```bash
repoguardian https://github.com/facebook/react
```

or

```bash
npx repoguardian https://github.com/facebook/react
```

Example:

```bash
repoguardian https://github.com/stejasav/GitStat
```

---

# ⚙️ How It Works

RepoGuardian performs the following steps automatically:

1. Fetches repository contents using the GitHub REST API.
2. Traverses every directory recursively.
3. Ignores unnecessary directories and binary assets.
4. Downloads each source code file.
5. Sends the source code to Google Gemini AI.
6. Detects potential security vulnerabilities.
7. Categorizes findings by severity.
8. Generates a professional HTML security report.

---

# 🔍 Security Checks

RepoGuardian currently detects:

- Hardcoded API Keys
- Hardcoded Passwords
- JWT Secrets
- Database Credentials
- Access Tokens
- Secrets
- Dangerous TODO/FIXME Comments
- Weak Authentication
- Weak Cryptography
- Insecure Configurations

---

# 📄 Output

After scanning, RepoGuardian automatically creates a `reports` directory inside your current working directory.

Example:

```
MyProject/
│
├── .env
├── package.json
├── node_modules/
└── reports/
    ├── security-report-1.html
    ├── security-report-2.html
    └── security-report-3.html
```

Each report contains:

- Executive Summary
- Repository Information
- Files Scanned
- Total Findings
- Severity Distribution
- Detailed Vulnerability Analysis
- Code Evidence
- AI Explanation
- Recommended Fixes

---

# 💻 Example

```bash
repoguardian https://github.com/stejasav/GitStat
```

Console Output:

```text
Fetching Repository...
Scanning Files...
Analyzing Source Code...

✅ Report generated successfully!

Location:
./reports/security-report-1.html
```

---

# 📊 Sample Report

The generated report includes:

- Executive Summary
- Repository Metadata
- Security Findings
- Severity Classification
- Code Evidence
- AI-generated Explanation
- Recommended Fixes

> **Add screenshots here for a better npm and GitHub presentation.**

Example:

```markdown
## Executive Summary

![Overview](assets/report-overview.png)

## Vulnerability Details

![Findings](assets/report-findings.png)
```

---

# 🏗️ Architecture

```
               GitHub Repository
                       │
                       ▼
             GitHub REST API
                       │
                       ▼
        Recursive Repository Traversal
                       │
                       ▼
         Download Source Code Files
                       │
                       ▼
           Google Gemini AI Analysis
                       │
                       ▼
         Security Vulnerability Detection
                       │
                       ▼
      Handlebars HTML Report Generation
                       │
                       ▼
      Professional Security Audit Report
```

---

# 🛠️ Tech Stack

- Node.js
- Google Gemini AI
- GitHub REST API
- Axios
- Handlebars
- HTML
- CSS

---

# 📌 Roadmap

Future improvements planned:

- [ ] PDF Report Export
- [ ] Markdown Report Export
- [ ] Parallel File Scanning
- [ ] GitHub Actions Integration
- [ ] Security Score
- [ ] Custom Ignore Rules
- [ ] SARIF Export
- [ ] Support for Private Repositories
- [ ] Multi-LLM Support (Gemini, OpenAI, Claude)

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.

2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Tejasav Singh**

GitHub: https://github.com/stejasav

---

## ⭐ If you found RepoGuardian useful, consider giving the repository a star!