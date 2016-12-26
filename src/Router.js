const IndexView = require("./index/IndexView");
const ExerciseView = require("./exercise/ExerciseView");

var Router = Backbone.Router.extend({

    routes : {
        ''                 : 'index',
        'exercise(/:date)' : 'exercise'
    },

    index : function index() {

        var me = this;

        App.exercises.fetch({
            reset: true,
        }).done(function(exercises){
            if(exercises.length == 0){
                me._goto(new IndexView());
            } else {
                me._goto(new ExerciseView());
            }
        }).fail(function(){

        });
        
    },

    exercise : function exercise(date) {
        // #exercise/${date}でアクセスされたときの処理を書く
        console.log('exercise', date);
    },

    _goto: function(newView){
        var oldView = this.currentView;
        if (!_.isUndefined(oldView)) {
            oldView.remove();
        }
        if (!_.isUndefined(newView)) {
            this.currentView = newView.render();
        }
    },

});

module.exports = Router;
