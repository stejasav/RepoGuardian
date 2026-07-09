const { GoogleGenAI } = require("@google/genai")

async function analyseCode({ filePath, code }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  })
  const systemPrompt = 
  `
    You are a Senior Application Security Engineer.

    Your task is to analyze source code for security vulnerabilities.

    Look ONLY for:

    1. Hardcoded credentials
    2. API Keys
    3. Secrets
    4. JWT Secrets
    5. Database credentials
    6. Dangerous TODO/FIXME comments
    7. Dangerous configurations
    8. Insecure authentication
    9. Weak cryptography
    10. Exposed tokens

    Ignore:

    - Code formatting
    - Variable naming
    - Performance
    - Refactoring suggestions
    - General code quality

    Return ONLY valid JSON.

    Schema:

    {
      "finding":[
        {
          "severity":"HIGH | MEDIUM | LOW",
          "issue":"",
          "line_No":0,
          "fileName": "",
          "matchedValue":"",
          "explanation":"",
          "recommendation":""
        }
      ]
    }

    If no security vulnerabilities are found, return:

    {
      "findings": []
    }

    Do not invent issues.
    Do not return code quality suggestions.
    Do not return markdown.
  `;

  const userPrompt = 
  `
    Repository File: ${filePath}

    Source Code:
    \`\`\`
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts : [
          {
            text: systemPrompt + "\n\n" + userPrompt
          }
        ]
      }
    ]
  });  
  const text = response.text;
  try{
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return parsed.finding || [];
  }catch(err){
    console.log("AI returned invalid json");
    console.log(err);
    return [];
  }
}


module.exports = { analyseCode };