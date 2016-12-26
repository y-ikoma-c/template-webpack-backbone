require("./IndexView.scss");

module.exports = Backbone.View.extend({

    el: "body",
    template: require('./IndexView.html'),

    initialize: function(){
        this.delegateEvents({
            "click .reload": this.onReload
        });
    },

    render: function(){
        var content = this.template({
            now: new Date().toLocaleString(),
        });
        this.$el.html(content);
        return this;
    },

    onReload:function(){
        this.render();
    },

});
