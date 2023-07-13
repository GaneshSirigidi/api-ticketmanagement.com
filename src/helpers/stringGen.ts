

const stringGen = () => {
  const text = "TCKT-";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generatedTexts = [];
 
  for (let i = 0; i < Infinity; i++) {
      let newText = "";
      for (let j = 0; j < 6; j++) {
          newText += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      if (!generatedTexts.includes(newText)) {
          generatedTexts.push(newText);
        return text + newText;
    }  
  }
};
export { stringGen };