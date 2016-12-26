require("./ExerciseView.scss");

var ExerciseView = Backbone.View.extend({

    el: "body",
    template: require('./ExerciseView.html'),

    initialize: function(){
        this.listenTo(App.exercises, "all", function(){
            console.log(arguments);
        });
    },

    render: function(){
        return this;
    },

    onReload:function(){
        this.render();
    },

});

module.exports = ExerciseView;
