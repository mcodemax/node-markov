/** Command-line tool to generate Markov text. */
const fs = require('fs');
const { MarkovMachine } = require("./markov");
const axios = require('axios');

let type; //used to tell is passing in url or file
const path = process.argv[3];



/**Make Markov machine from text and gen text from it. */

function genText(text) {
    let machine = new MarkovMachine(text);
    console.log(machine.makeText());
}

/**read URL and gen text */
async function makeURLText(url) {
    let res;
  
    try {
      res = await axios.get(url);
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
    genText(res.data)
};
  

/**Read file and gen txt. */

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
      } else {
        genText(data);
      }
    });
}



if(process.argv[2] === 'file' || process.argv[2] === 'url'){
    type = process.argv[2]; //tells if file or url
}else{
    console.log(`Error: Please decide if you are passing in a file or url`);
        process.exit(1);
} 

if(type === 'file'){
    makeText(path);
}else{
    makeURLText(path);
}