var Exercise = Backbone.Model.extend({
    initialize: function(){

    },
    defaults: {
        lhs: -1,
        ope: "+",
        rhs: -1,
        ans: -1,
        verify: null,
    },
    getExpression: function(){
        return this.get("lhs") + this.get("ope") + this.get("rhs")
    },
    isUsable: function(){
        return -1 < eval(this.getExpression());
    },
    verify: function(){
        this.set("verify", eval(this.getExpression()) === this.get("ans"));
    }
});

module.exports = Exercise;
