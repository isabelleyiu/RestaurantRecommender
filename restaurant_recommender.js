class Restaurant {
  constructor(name, category) {
    this.name = name;
    this.category = category;
    this.numReviews;
    this.averageScore;
  }
}

class User {
  constructor(userName) {
    this.userName = userName;
  }
}

class Category {
  constructor(category) {
    this.category = category;
  }
}

class Rating {
  constructor(restaurant, category, user, rating) {
      this.restaurant = restaurant;
      this.category = category;
      this.user = user;
      this.rating = rating;
  }
}

class RestaurantRecommender{
  constructor() {
  // All main properties should go here.
  this.restaurants = [];
  this.users = [];
  this.ratings = [];
  this.categories = {};
  }

  addUser(user) {
  // Adds a new User to the System
    var newUser = new User(user);
    this.users.push(newUser);
  }

  deleteUser(userName) {
    // Deletes a User from the system
    var index = this.users.findIndex(function(user){
      return user.userName === userName;
    });
    this.users.splice(index, 1);

  // Deletes User ratings for a restaurant.
    this.ratings.forEach(function(rating, i){
      if(rating.user === userName) {
        index = i;
      }
    });
    this.ratings.splice(index, 1);
  }

  addRestaurant(name, category) {
    // Adds a new Restaurant to the System
    var newRestaurant = new Restaurant(name, category);
    this.restaurants.push(newRestaurant);

    // Add restaurant to category 
    if(this.categories[category]) {
      this.categories[category].push(newRestaurant.name);
    } else {
      this.categories[category] = [newRestaurant.name];
    }
  }

  addRating(restaurant, category, user, rating){
    // Adds a user rating for a restaurant
    var newRating = new Rating(restaurant, category, user, rating);
    var ratingExists = false;

    // update the score if previous rating by same user already exists
    this.ratings.forEach(function(rating){
      if(rating.restaurant === newRating.restaurant && rating.user === newRating.user) {
        rating.rating = newRating.rating;
        ratingExists = true;
      }
    });

    if(!ratingExists) {
      this.ratings.push(newRating);
    }

    // add restaurant if it's not in the system
    var restaurantIndex = this.restaurants.findIndex(function(restaurant){
      return restaurant.name === newRating.restaurant;
    });
    if(restaurantIndex === -1) {
      this.addRestaurant(newRating.restaurant, newRating.category);
    }

    // add user if it's not in system
    var userIndex = this.users.findIndex(function(user){
      return user.userName === newRating.user;
    });
    if(userIndex === -1) {
      this.addUser(newRating.user);
    }
  }

  getRestaurantAverageScore(restaurant) {
    var totalScores = 0;
    var numReview = 0;

    this.ratings.forEach(function(rating){
      if(rating.restaurant === restaurant) {
        numReview += 1;
        totalScores += rating.rating;
      }
    });

    return totalScores / numReview;
  }

  // deleteRestaurant() {
  // // make sure to also delete a restaurant from the categories.
  // }

  // deleteCategory() {
  // // make sure to delete categories from a restaurant that had them.
  // }

  filterByCategory(category){
    return this.categories[category];
  } 

  filterByAverageScore(score){
    var aboveScoreRestaurants = [];
    var self = this;
    var filtered = this.restaurants.forEach(function(restaurant){
      if(self.getRestaurantAverageScore(restaurant.name) >= score) {
        aboveScoreRestaurants.push(restaurant.name);
      }
    });
    return aboveScoreRestaurants;
  }
}


// var yelp = new RestaurantRecommender ();
// yelp.addUser('isabelleyiu');
// yelp.addUser('kelly');
// yelp.addRestaurant('Rintaro', 'Japanese');
// yelp.addRestaurant('Panda Express', 'Chinese');
// yelp.addRating('Rintaro', 'Japanese', 'isabelleyiu', 85);
// yelp.addRating('Panda Express', 'Chinese', 'kelly', 95);
// yelp.addRating('Chaya', 'Thai', 'Danielle', 80);
// yelp.addRating('Chaya', 'Thai', 'Chisom', 100);
// yelp.addRating('Chaya', 'Thai', 'Ingrid', 0);
// // yelp.deleteUser('isabelleyiu');
// console.log(yelp.filterByCategory('Chinese'));
// console.log(yelp.getRestaurantAverageScore('Chaya'));
// console.log(yelp.filterByAverageScore(85));
// // // console.log(yelp.filterByAverageScore(40));
// console.log(yelp);

$(document).ready(function(){

  var yelp = new RestaurantRecommender();
  
  // Sign up form
  $('.userForm').on('submit', function(event){
    event.preventDefault();
    var $userInput = $('#username');
    var username = $userInput.val().trim();

    // adding new user to RestaurantRecommender class
    yelp.addUser(username);

    // reset form input
    $userInput.val('');
    console.log(yelp);
  });

  // Add a restaurant form
  $('.restaurantForm').on('submit', function(event){
    event.preventDefault();
    var $restaurantName = $('#restaurantName');
    var $restaurantCategory = $('#restaurantCategory');
    var restaurantName = $restaurantName.val().trim();
    var restaurantCategory = $restaurantCategory.val().trim();

    // add restaurant to system
    yelp.addRestaurant(restaurantName, restaurantCategory);

    $restaurantName.val('');
    $restaurantCategory.val('');
    console.log(yelp);
  });

  $('.ratingForm').on('submit', function(event){
    event.preventDefault();
    var $ratingRestaurant = $('#ratingRestaurant');
    var $ratingCategory = $('#ratingCategory');
    var $ratingUsername = $('#ratingUsername');
    var $rating = $('#rating');

    var ratingRestaurant = $ratingRestaurant.val().trim();
    var ratingCategory = $ratingCategory.val().trim();
    var ratingUsername = $ratingUsername.val().trim();
    var rating = $rating.val().trim();

    yelp.addRating(ratingRestaurant, ratingCategory, ratingUsername, rating);

    $ratingRestaurant.val('');
    $ratingCategory.val('');
    $ratingUsername.val('');
    $rating.val('');
    console.log(yelp);
  });
  
  $('#searchBar').on('submit', function(event){
    event.preventDefault();
    $('#searchResult').empty();
    var $searchCategory = $('#searchCategory');
    var searchCategory = $searchCategory.val().trim();

    // adding new user to search restaurants by category
    var result = yelp.filterByCategory(searchCategory);

    // render result inside searchResult div
    result.forEach(function(restaurant, i){
      $('#searchResult').prepend('<div>' + result[i] + '</div>');
    });

    // reset form input
    $searchCategory.val('');
    console.log(yelp);
  });
});

// module.exports=RestaurantRecommender;