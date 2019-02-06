class Restaurant {
  constructor(name, id, category) {
    this.name = name;
    this.category = category;
    this.id  = id;
    this.ratings = {};
    this.numRatings = function() {
      return Object.values(this.ratings).length;
    }

    this.averageRating = function() {
      var scores = Object.values(this.ratings);

      var totalScores = 0;
      scores.forEach(function(score){
        totalScores += score;
      });
    
      return totalScores / scores.length;
    }
  }
  
}

class User {
  constructor(firstName, lastName, userName, id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.id = id;
    this.ratings = {};
  }
}

class Category {
  constructor(type) {
    this.type = type;
  }
}

class Rating {
  constructor(restaurant, category, user, score) {
      this.restaurant = restaurant;
      this.category = category;
      this.user = user;
      this.score = score;
  }
}

class RestaurantRecommender{
  constructor() {
  // All main properties should go here.
  this.restaurants = [];
  this.users = [];
  this.categories = {};
  }

  addUser(user) {
  // Adds a new User to the System
    this.users.push(user);
  }

  // deleteUser(userid) {
  // // Deletes a User from the system

  // // Deletes User ratings for a restaurant.
  // }

  addRestaurant(restaurant) {
    // Adds a new Restaurant to the System
    this.restaurants.push(restaurant);
    if(this.categories[restaurant.category]) {
      this.categories[restaurant.category].push(restaurant.name);
    } else {
      this.categories[restaurant.category] = [restaurant.name];
    }
  }

  addRating(rating){
    // Adds a user rating for a restaurant
    var restaurant = this.restaurants.find(function(obj){
      return obj.name === rating.restaurant;
    });
    
    var user = this.users.find(function(obj){
      return obj.userName === rating.user;
    });

    restaurant.ratings[rating.user] = rating.score;  
    user.ratings[rating.restaurant] = rating.score;
  }

  updateRating(rating) {
    this.sumRatings += rating;
    this.numRatings++;
    this.averageRating = sumRatings/numRatings;
  }
  // deleteRestaurant() {
  // // make sure to also delete a restaurant from the categories.
  // }

  // deleteCategory() {
  // // make sure to delete categories from a restaurant that had them.
  // }

  // filter(){
  // } 
}


var yelp = new RestaurantRecommender ();
var isabelle = new User('Isabelle', 'Yiu', 'isabelleyiu', yelp.users.length);
yelp.addUser(isabelle);
var rintaro = new Restaurant('Rintaro',  yelp.restaurants.length, 'Japanese');
yelp.addRestaurant(rintaro);
var panda = new Restaurant('Panda Express',  yelp.restaurants.length, 'Chinese');
yelp.addRestaurant(panda);
var rintaroRating = new Rating('Rintaro', 'Japanese', 'isabelleyiu', 95);
yelp.addRating(rintaroRating);
console.log(rintaro.numRatings());

console.log(yelp);

// $(document).ready(function(){

//   var yelp = new RestaurantRecommender ();
//   console.log(yelp);
//   $('#signup').submit(function(event){
    
//     var username = $('#username').val();
//     console.log(username);
//     var newUser = new User('Isabelle', 'Yiu', username, yelp.length);
//     yelp.addUser(newUser);
//   });
// });