var ExerciseListItem = Backbone.View.extend({

    tagName: "li",
    className: "exercise-list__item",
    template: require("./ExerciseListItem.html"),

    initialize: function(){
        this.listenTo(this.model, "change:verify", this.onVerifyChanged);
        this.delegateEvents({
            "change .ans": this.onAnswerChanged
        });
    },

    render: function(){

        this.$el.html(this.template(this.model.toJSON()));
        this.$verify = this.$el.find(".verify");

        return this;
    },

    onAnswerChanged: function(evt){
        this.model.set("ans", parseInt($(evt.currentTarget).val()));
    },

    onVerifyChanged: function(exercise, verify){
        if (verify) {
            this.$verify.addClass("verify--ok");
            this.$verify.removeClass("verify--ng");
        } else {
            this.$verify.addClass("verify--ng");
            this.$verify.removeClass("verify--ok");
        }
    },

});

module.exports = ExerciseListItem;
