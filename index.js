// 1. Count the number of vowles in a string using reduce

const input = "Helloyyyyyyy World!";
const vowels = "aeiouy";

const reduced = [...input.toLowerCase()].reduce((accumulator, char) => {
  if (vowels.includes(char)) {
    accumulator[char] = (accumulator[char] || 0) + 1;
  }

  return accumulator;
}, {});

const count = [...input.toLowerCase()].reduce((accumulator, char) => {
  if (vowels.includes(char)) {
    accumulator++;
  }

  return accumulator;
}, 0);

console.log(reduced);
console.log(count);

// 2. Turn an array of numbers into a total of all the numbers

const total = (arr) => {
  return arr.reduce((accumulator, num) => {
    return accumulator + num;
  }, 0);
};

console.log(total([1, 2, 3])); // 6

// 3. Turn an array of numbers into a long string of all those numbers.
const stringConcat = (arr) => {
  return arr.reduce((accumulator, char) => {
    return accumulator.concat(char);
  }, "");
};

console.log(stringConcat([1, 2, 3])); // "123"

// 4. Turn an array of voter objects into a count of how many people voted
const totalVotes = (arr) => {
  return arr.reduce((accumulator, item) => {
    if (item.voted) {
      return accumulator + 1;
    } else {
      return accumulator;
    }
  }, 0);
};

var voters = [
  { name: "Bob", age: 30, voted: true },
  { name: "Jake", age: 32, voted: true },
  { name: "Kate", age: 25, voted: false },
  { name: "Sam", age: 20, voted: false },
  { name: "Phil", age: 21, voted: true },
  { name: "Ed", age: 55, voted: true },
  { name: "Tami", age: 54, voted: true },
  { name: "Mary", age: 31, voted: false },
  { name: "Becky", age: 43, voted: false },
  { name: "Joey", age: 41, voted: true },
  { name: "Jeff", age: 30, voted: true },
  { name: "Zack", age: 19, voted: false },
];

console.log(totalVotes(voters)); // 7

// 5. Given an array of all your wishlist items, figure out how much it would cost to just buy everything at once
const shoppingSpree = (arr) => {
  return arr.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
};

var wishlist = [
  { title: "Tesla Model S", price: 90000 },
  { title: "4 carat diamond ring", price: 45000 },
  { title: "Fancy hacky Sack", price: 5 },
  { title: "Gold fidgit spinner", price: 2000 },
  { title: "A second Tesla Model S", price: 90000 },
];

console.log(shoppingSpree(wishlist)); // 227005

// 6) Given an array of arrays, flatten them into a single array
const flatten = (arr) => {
  return arr.reduce((accumulator, index) => {
    const combined = [...accumulator, index];
    return combined.flat();
  }, []);
};

var arrays = [["1", "2", "3"], [true], [4, 5, 6]];

const flattenedArray = flatten(arrays);
console.log(flattenedArray); // ["1", "2", "3", true, 4, 5, 6];
console.log(flattenedArray.length);

// 7.  Given an array of potential voters, return an object representing the results of the vote
// Include how many of the potential voters were in the ages 18-25, how many from 26-35, how many from 36-55,
// and how many of each of those age ranges actually voted. The resulting object containing this data should
// have 6 properties. See the example output at the bottom.

var voters = [
  { name: "Bob", age: 30, voted: true },
  { name: "Jake", age: 32, voted: true },
  { name: "Kate", age: 25, voted: false },
  { name: "Sam", age: 20, voted: false },
  { name: "Phil", age: 21, voted: true },
  { name: "Ed", age: 55, voted: true },
  { name: "Tami", age: 54, voted: true },
  { name: "Mary", age: 31, voted: false },
  { name: "Becky", age: 43, voted: false },
  { name: "Joey", age: 41, voted: true },
  { name: "Jeff", age: 30, voted: true },
  { name: "Zack", age: 19, voted: false },
];

const addToAccumator = (
  accumulator,
  item,
  age1,
  age2,
  peopleCount,
  peopleVotes
) => {
  if (item.age >= age1 && item.age <= age2) {
    accumulator[peopleCount] = (accumulator[peopleCount] || 0) + 1;

    if (item.voted) {
      accumulator[peopleVotes] = (accumulator[peopleVotes] || 0) + 1;
    }
  }

  return accumulator;
};

const voterResults = (arr) => {
  return arr.reduce((accumulator, item) => {
    accumulator = addToAccumator(
      accumulator,
      item,
      18,
      25,
      "numYoungPeople",
      "numYoungVotes"
    );
    accumulator = addToAccumator(
      accumulator,
      item,
      26,
      35,
      "numMidsPeople",
      "numMidVotesPeople"
    );
    accumulator = addToAccumator(
      accumulator,
      item,
      36,
      55,
      "numOldsPeople",
      "numOldVotesPeople"
    );

    return accumulator;
  }, {});
};

console.log(voterResults(voters)); // Returned value shown below:
/*
{ numYoungVotes: 1,
numYoungPeople: 4,
numMidVotesPeople: 3,
numMidsPeople: 4,
numOldVotesPeople: 3,
numOldsPeople: 4 
}
*/
