"use strict";

const Router = require("./Router");
const EventBus = require("./EventBus");
const Exercises = require("./model/Exercises");

window.App = {
    router: new Router(),
    eventBus: new EventBus(),
    exercises: new Exercises(),
};

Backbone.history.start();
