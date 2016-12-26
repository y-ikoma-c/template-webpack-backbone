var Exercise = Backbone.Model.extend({
    initialize: function(){

    },
    defaults: {
        lhs: 0,
        ope: "+",
        rhs: 0,
        ans: 0,
    },
});

module.exports = Exercise;
