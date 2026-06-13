// const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"


// // const model = "deepseek/deepseek-chat"
// // const model = "deepseek/deepseek-v3.2"

// export const generateResponse = async(prompt)=>{
//     const res = await fetch(openRouterUrl, {
//   method: 'POST',
//   headers: { 
//     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     model: model,
//     messages: [
//         {
//             role:'system',
//             content:`
//               You are a professional frontend AI assistant.

//               RULES:
//               - Return ONLY raw HTML
//               - Do NOT return JSON
//               - Do NOT return markdown
//               - Do NOT use \`\`\`
//               - Start directly with <!DOCTYPE html>
//               - Return one complete HTML document
//             `
//         },

//       {
//         role: 'user',
//         content: prompt,
//       },
//     ],
//     temperature:0.2
//   }),
// });

// if(!res.ok){
//     const err = await res.text()
//     throw new Error("openRouter err" + err)
// }

// const data = await res.json()
// return data.choices[0].message.content
// }




import Groq from "groq-sdk"; 

let groq;

const getGroq = () => {
  if (!groq) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY missing in environment");
    }

    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  } 

  return groq;
};


export const generateResponse = async (prompt) => {
  try {
    const groq = getGroq();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You must return ONLY valid raw JSON",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    throw new Error("Groq error: " + error.message);
  }
};










// import { GoogleGenAI } from "@google/genai";

// let ai;

// const getGemini = () => {
//   if (!ai) {
//     if (!process.env.GEMINI_API_KEY) {
//       throw new Error("GEMINI_API_KEY missing in environment");
//     }

//     ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });
//   }

//   return ai;
// };

// export const generateResponse = async (prompt) => {
//   try {
//     const ai = getGemini();

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",

//       contents: [
//         {
//           role: "system",
//           parts: [
//             {
//               text: `
//                 You are a professional frontend AI assistant.

//                 RULES:
//                 - Return only raw HTML
//                 - No markdown
//                 - No explanations
//                 - No \`\`\`
//                 - Start directly with <!DOCTYPE html>
//               `,
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {
//               text: prompt,
//             },
//           ],
//         },
//       ],

//       config: {
//         temperature: 0.7,
//         maxOutputTokens: 8000,
//         topP: 0.9,
//       },
//     });

//     return response.text;
//   } catch (error) {
//     throw new Error("Gemini error: " + error.message);
//   }
// };