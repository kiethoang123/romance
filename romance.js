let text =
 "Ever since I left the city, you, you, you You and me we just don't get along";


 function parseText(textString) {
    let textArray = [];
  
  
    let punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let noPunc = text.replace(punctuation, "").toLowerCase();
    textArray = noPunc.split(" ");
  
    return textArray;
  }
  
  function generateWordPairs(text) {
    let markovChain = {};
    let textArray = parseText(text);
  
    
    for (let i = 0; i < textArray.length; i++) {
      if (textArray[i + 1] === undefined) {
        return markovChain;
      }
      if (textArray[i] in markovChain) {
        let duplicate = textArray[i + 1];
        let index = markovChain[textArray[i]];
        index.push(duplicate);
      } else {
        markovChain[textArray[i]] = [textArray[i + 1]];
      }
    }
  }
  
  function writeLine(markovChain, wordCount) {
    let keys = Object.keys(markovChain);
    let startingWord = randomWord(keys);
    
    let line = [startingWord];
  
    for (let i = 1; i < wordCount; i++) {
      let nextPos = markovChain[startingWord];
      if (nextPos) {
        startingWord = randomWord(nextPos);
        line.push(startingWord);
        if (line.length > wordCount) {
          break;
        }
      } else {
        startingWord = randomWord(keys);
      }
    }
    return line.join(" ");
  }
  
  function randomWord(word) {
    
    let max = Math.floor(word.length);
    let randomNum = Math.floor(Math.random() * max);
    return word[randomNum];
  }
  
  function generatePoem(corpus, numLines, numWords) {
    
    let textSection = document.getElementById("text-section");

    textSection.innerHTML = "";
  
    let poem = "";
    corpus = parseText(corpus);
    let wordPairs = generateWordPairs(corpus);
  
    for (let i = 0; i < numLines; i++) {
   
      let newPara = document.createElement("p");
      poem = writeLine(wordPairs, numWords) + "\n";
      textSection.appendChild(newPara);
      newPara.innerHTML = poem;
    }
    return poem;
  }
  
  let button = document.getElementById("submit");
  
  if (button) {
    button.addEventListener("click", function () {
     
      let userText = document.getElementById("text-input").value;
      let userLine = document.getElementById("numLines").value;
      let userWord = document.getElementById("numWords").value;
  
      
      if (userLine > 10 || userWord > 10) {
        alert("Use a value less than 10.");
      } else {
        text = userText;
        generatePoem(text, userLine, userWord);
      }
    });
  }