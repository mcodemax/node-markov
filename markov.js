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

    this.markovMap = markovMap;
  }

  /** returns a random ele in arr */
  static chooseWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }



  /** return random text from chains */

  makeText(numWords = 100) {
    const keys = Array.from(this.markovMap.keys()); //makes arr of keys from markov Map
    let word = MarkovMachine.chooseWord(keys);
    let str = word;

    for(let i = 1; i < numWords; i++){//we start @ i = 1 b/c str already has 1 word in it
      word = MarkovMachine.chooseWord(this.markovMap.get(word));//chose next word to add to the str
      
      if(word === null) break;

      str+=` ${word}`;
    }

    return str;
  }   
}

// let testMachine = new MarkovMachine(`I could not, would not, on a boat.
// I will not, will not, with a goat.
// I will not eat them in the rain.
// I will not eat them on a train.
// Not in the dark! Not in a tree!
// Not in a car! You let me be!
// I do not like them in a box.
// I do not like them with a fox.
// I will not eat them in a house.
// I do not like them with a mouse.
// I do not like them here or there.
// I do not like them anywhere!`);
// console.log( testMachine.markovMap )

module.exports = {
  MarkovMachine: MarkovMachine
};