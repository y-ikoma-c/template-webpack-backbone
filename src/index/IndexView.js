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
        return this;
    },

    onCreateExercise:function(){
        var config = {
            hasAddition: this.$addition.prop("checked"),
            hasSubtraction: this.$subtraction.prop("checked"),
            count: parseInt(this.$count.val()),
        };
        App.eventBus.trigger("configure:exercise", config);
    },

});

module.exports = IndexView;
