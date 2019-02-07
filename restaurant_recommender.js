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
  constructor(userName, id) {
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

  deleteUser(userName) {
    // Deletes a User from the system
    var userId;
    this.users.forEach(function(user){
      if(user.userName === userName) {
        userId = user.id
      }
    });
    this.users.splice(userId, 1);

    // Deletes User ratings for a restaurant.
    this.restaurants.forEach(function(restaurant){
      if(restaurant.ratings[userName]) {
        delete restaurant.ratings[userName];
      }
    });

  }

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
    // this should update rating 
    restaurant.ratings[rating.user] = rating.score;  
    user.ratings[rating.restaurant] = rating.score;
  }

  // updateRating(rating) {
  //   this.sumRatings += rating;
  //   this.numRatings++;
  //   this.averageRating = sumRatings/numRatings;
  // }

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
var isabelle = new User('isabelleyiu', yelp.users.length);
yelp.addUser(isabelle);
var kelly = new User('kelly', yelp.users.length);
yelp.addUser(kelly);
var rintaro = new Restaurant('Rintaro',  yelp.restaurants.length, 'Japanese');
yelp.addRestaurant(rintaro);
var panda = new Restaurant('Panda Express',  yelp.restaurants.length, 'Chinese');
yelp.addRestaurant(panda);
var rintaroRating = new Rating('Rintaro', 'Japanese', 'isabelleyiu', 95);
yelp.addRating(rintaroRating);
var pandaRating = new Rating('Panda Express', 'Chinese', 'kelly', 95);
yelp.addRating(pandaRating);
console.log(rintaro.numRatings());
yelp.deleteUser('isabelleyiu');
console.log(yelp);

// $(document).ready(function(){

//   var yelp = new RestaurantRecommender ();
  
//   $('#userForm').on('submit', function(event){
//     event.preventDefault();
//     var $username = $('#username').val();
//     var newUser = new User($username, yelp.users.length);
//     yelp.addUser(newUser);
//   });


//   console.log(yelp);
// });