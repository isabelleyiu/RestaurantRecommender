class Restaurant {
  constructor(name, id, category) {
    this.name = name;
    this.category = category;
    this.id  = id;
    this.ratings = [];
    this.averageRating = 5;
    this.numRatings = 0;
    this.sumRatings = 0;
  }
  addRating(score){
    // Adds a user rating for a restaurant
    this.ratings.push(score);  
  }

  getAverageScore() {
    var totalScore = this.ratings.reduce(function(acc, score){
      return acc + score;
    }, 0);
  
    return totalScore / this.ratings.length;
  }
  
  updateRating(rating) {
    this.sumRatings += rating;
    this.numRatings++;
    this.averageRating = sumRatings/numRatings;
  }

}

class User {
  constructor(firstName, lastName, userName, id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.id = id;
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

  addRestaurant(restaurant) {
    // Adds a new Restaurant to the System
    this.restaurants.push(restaurant);
    if(this.categories[restaurant.category]) {
      this.categories[restaurant.category].push(restaurant.name);
    } else {
      this.categories[restaurant.category] = [restaurant.name];
    }
  }

  

  

  // deleteUser() {
  // // Deletes a User from the system
  // // Deletes User ratings for a restaurant.
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
var isabelle = new User('Isabelle', 'Yiu', 'isabelleyiu', yelp.users.length);
yelp.addUser(isabelle);
var rintaro = new Restaurant('Rintaro',  yelp.restaurants.length, 'Japanese');
yelp.addRestaurant(rintaro);
var rintaroRating = new Rating('Rintaro', 'Japanese', 'Isabelle', '95');
rintaro.addRating(rintaroRating.score);
console.log(rintaro.getAverageScore());


// var chinese = new Category('Chinese');
// yelp.addCategory(chinese);
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