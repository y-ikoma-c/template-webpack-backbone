const Exercise = require("../model/Exercise");
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
        this.$count = this.$el.find(".count");
        this.$upper = this.$el.find(".upper");
        this.$lower = this.$el.find(".lower");
        return this;
    },

    onCreateExercise:function(){

        var conf = {
            operators: [],
            count: parseInt(this.$count.val()),
            upper: parseInt(this.$upper.val()),
            lower: parseInt(this.$lower.val()),
        };

        if (this.$addition.prop("checked"))conf.operators.push("+");
        if (this.$subtraction.prop("checked")) conf.operators.push("-");

        _.times(conf.count, function(i){

            var no = i + 1;
            var exercise;
            while(!(exercise = this._newExercise(no, conf)).isUsable()){

            };

            App.exercises.create(exercise);

        }, this);

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
