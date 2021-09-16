/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
    const markovMap = new Map();

    for(let i = 0; i < this.words.length; i++){
      
      if(!markovMap.has(this.words[i])){//if word is a not a key in the markovMap
        markovMap.set(this.words[i], []); //k,v -> value is empty array to push vals
      }

      //if words[i+1] exists, push next val into arr; else push null
      if(this.words[i + 1] || this.words[i + 1] === 0){//accounts incase the read in text has a 0, so it's not accidentally read as falsy
        markovMap.get(this.words[i]).push(this.words[i + 1]);
      }else{
        markovMap.get(this.words[i]).push(null);
      }
    }

    return markovMap;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO

    let str = '';

    for(let i = 0; i < numWords; i++){
    //get the object from makeChains and append it to a string
    //for each (this.words[i]) randomly chose the word it's mapped to
    }

    return str;
  }   
}


const machine = new MarkovMachine(`the cat in the hat is in the hat`);
console.log(machine.makeChains());