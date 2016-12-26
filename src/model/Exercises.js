const Exercise = require("./Exercise");
const Store = require("backbone.localstorage");

var Exercises = Backbone.Collection.extend({
    model: Exercise,
    localStorage: new Store("Exercises"),
});

module.exports = Exercises;
