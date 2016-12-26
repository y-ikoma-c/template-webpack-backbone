var Exercise = Backbone.Model.extend({
    initialize: function(){

    },
    defaults: {
        lhs: 0,
        ope: "+",
        rhs: 0,
        ans: 0,
    },
    getExpression: function(){
        return this.get("lhs") + this.get("ope") + this.get("rhs")
    },
    isUsable: function(){
        return -1 < eval(this.getExpression());
    },
});

module.exports = Exercise;
