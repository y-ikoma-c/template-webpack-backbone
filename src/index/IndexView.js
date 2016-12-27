const Exercise = require("../model/Exercise");
const ExerciseListItem = require("./ExerciseListItem");
require("./IndexView.scss");

var IndexView = Backbone.View.extend({

    el: "body",
    template: require('./IndexView.html'),

    initialize: function(){
        this.listenTo(App.exercises, "change:ans", function(model, value, options){
            var answeredCount = _.without(App.exercises.pluck("ans"), -1).length;
            this.$vefify.prop("disabled", this.conf.count !== answeredCount);
        });
        this.delegateEvents({
            "click .create-exercise": this.onCreateExercise,
            "click .verify-exercise": this.onVerifyExercise
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
        this.$vefify = this.$el.find(".verify-exercise");

        return this;
    },

    onCreateExercise:function(){

        this.conf = {
            operators: [],
            count: parseInt(this.$count.val()),
            upper: parseInt(this.$upper.val()),
            lower: parseInt(this.$lower.val()),
        };

        if (this.$addition.prop("checked")){
            this.conf.operators.push("+");
        }
        if (this.$subtraction.prop("checked")) {
            this.conf.operators.push("-");
        }

        App.exercises.reset(null);

        _.times(this.conf.count, function(i){

            var no = i + 1;

            var exercise;
            while(!(exercise = this._newExercise(no, this.conf)).isUsable()){};

            App.exercises.add(exercise);

        }, this);

        this.renderExercises(App.exercises);

    },

    onVerifyExercise: function(){
        App.exercises.each(function(exercise){
            exercise.verify();
        });
    },

    renderExercises: function(exercises){
        var fragment = document.createDocumentFragment();
        exercises.each(function(exercise){
            var item = new ExerciseListItem({
                model: exercise,
            })
            fragment.appendChild(item.render().el);
        });
        this.$exerciseList.html(fragment);
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
