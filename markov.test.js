const { MarkovMachine } = require("./markov");


test("Make sure makeText doesn't go over numWords", () => {
    const seedText = `I could not, would not, on a boat.
                        I will not, will not, with a goat.
                        I will not eat them in the rain.
                        I will not eat them on a train.
                        Not in the dark! Not in a tree!
                        Not in a car! You let me be!
                        I do not like them in a box.
                        I do not like them with a fox.
                        I will not eat them in a house.
                        I do not like them with a mouse.
                        I do not like them here or there.
                        I do not like them anywhere!`;
    let testMachine = new MarkovMachine(seedText);

    const genLength = wordCount(testMachine.makeText());
    expect(genLength).toBeLessThanOrEqual(100);
})

test("make sure correct markov map is made", () => {
    let testMachine = new MarkovMachine(`the cat in the hat is in the hat`);
    const catHatMap = new Map();
    catHatMap.set('the',['cat', 'hat', 'hat']);
    catHatMap.set('cat',['in']);
    catHatMap.set('in',['the', 'the']);
    catHatMap.set('hat',['is', null]);
    catHatMap.set('is',['in']);

    expect(testMachine.markovMap).toEqual(catHatMap);
});


test("Make sure chooseWord method is random", () => {
    
    const seedText = `I could not, would not, on a boat.
                        I will not, will not, with a goat.
                        I will not eat them in the rain.
                        I will not eat them on a train.
                        Not in the dark! Not in a tree!
                        Not in a car! You let me be!
                        I do not like them in a box.
                        I do not like them with a fox.
                        I will not eat them in a house.
                        I do not like them with a mouse.
                        I do not like them here or there.
                        I do not like them anywhere!`;
    let testMachine = new MarkovMachine(seedText);
    const arr = [ 'in', 'on', 'in', 'with', 'in', 'with', 'here', 'anywhere!' ];

    // expect([MarkovMachine.chooseWord(arr)]).arrayContaining(arr);
    expect(arr).toEqual(expect.arrayContaining([MarkovMachine.chooseWord(arr)]));
    
});

function wordCount(str) { 
    return str.split(" ").length;
}