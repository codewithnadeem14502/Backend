var oneLinerJoke = require("one-liner-joke");
var getRandomJoke = oneLinerJoke.getRandomJoke({
  exclude_tags: ["dirty", "racist", "marriage"],
});
console.log(getRandomJoke);
