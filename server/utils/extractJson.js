// const extractJson = async(text)=>{
//     if(!text){
//         return
//     }
//     const cleaned = text.replace(/```json/gi,"")
//         .replace(/```/g,"")
//         .trim()

//     const firstBrace = cleaned.indexOf('{')
//     const closeBrace = cleaned.lastIndexOf('}')
//     if(firstBrace === -1 || closeBrace == -1) return null
//     const jsonString = cleaned.slice(firstBrace, closeBrace+1)
//     return JSON.parse(jsonString)
// }

// export default extractJson




const extractJson = (text) => {
  if (!text) return null;

  try {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/\n/g, " ")
      .trim();

    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");

    if (first === -1 || last === -1) return null;

    const jsonString = cleaned.slice(first, last + 1);

    return JSON.parse(jsonString);
  } catch (err) {
    console.log("JSON parse failed:", err.message);
    return null;
  }
};

export default extractJson