const Exercise = require("../model/Exercise");
const ExerciseListItemTpl = require("./ExerciseListItem.html");
require("./IndexView.scss");

var IndexView = Backbone.View.extend({

    el: "body",
    template: require('./IndexView.html'),

    initialize: function(){
        this.delegateEvents({
            "click .create-exercise": this.onCreateExercise
        });
    },

    render: function(){

        this.$el.append(this.template());

        this.$addition = this.$el.find(".addition");
        this.$subtraction = this.$el.find(".subtraction");
        this.$upper = this.$el.find(".upper");
        this.$lower = this.$el.find(".lower");
        this.$count = this.$el.find(".count");
        this.$exerciseList = this.$el.find(".exercise-list");

        return this;
    },

    onCreateExercise:function(){

        var conf = {
            operators: [],
            count: parseInt(this.$count.val()),
            upper: parseInt(this.$upper.val()),
            lower: parseInt(this.$lower.val()),
        };

        if (this.$addition.prop("checked")){
            conf.operators.push("+");
        }
        if (this.$subtraction.prop("checked")) {
            conf.operators.push("-");
        }

        App.exercises.reset(null);

        _.times(conf.count, function(i){

            var no = i + 1;

            var exercise;
            while(!(exercise = this._newExercise(no, conf)).isUsable()){};

            App.exercises.add(exercise);

        }, this);

        this.renderExercises(App.exercises);

    },

    renderExercises: function(exercises){
        var contents = "";
        exercises.each(function(exercise){
            contents += ExerciseListItemTpl(exercise.toJSON());
        });
        this.$exerciseList.html(contents);
    },

    _newExercise: function(no, conf){
        return new Exercise({
            no: no,
            lhs : _.random(conf.lower, conf.upper),
            ope : conf.operators[_.random(0, conf.operators.length - 1)],
            rhs : _.random(conf.lower, conf.upper),
        });
    },

});

module.exports = IndexView;
