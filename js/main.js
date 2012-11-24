(function() {


window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

//////
// Helper method for templates
window.template = function(id) {
	return _.template($('#' + id).html() );
};



//////
// Person Model
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'John Doe',
		age: 30,
		occupation: 'worker'
	},
});

//////
// A list of people
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person,

});

//////
// Collection View 
App.Views.People = Backbone.View.extend({
	tagName: 'ul',


	render: function(){
		//filter through all items
			this.collection.each(function(person){
				// for each create a new personview
				var personView = new App.Views.Person({ model: person });
				// append to collection
				this.$el.append(personView.render().el);
			}, this);

			// always return this from a render method 
			// to allow for chaining somethingView.render().el
			return this;
		}
})

//////
// The view for a person
App.Views.Person = Backbone.View.extend({
	tagName: 'li',

	template: template('personTemplate'),

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});



/////
//  Create a new collection with some people in it
var peopleCollection = new App.Collections.People([
	{
		name: 'jeff',
		age: 78
	},
	{
		name: 'boob',
		age: 45
	},
	{
		name: 'awesome coder',
		age: 34
	}

]);

//////
//Create a collection view too see all the people in the collection
var peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);

//////
// END of the self invoking anonymous function that wraps our app
})();  




