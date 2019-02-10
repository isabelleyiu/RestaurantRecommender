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

  getRestaurantReviews(restaurant) {
    var numReview = 0;

    this.ratings.forEach(function(rating){
      if(rating.restaurant === restaurant) {
        numReview += 1;
      }
    });

    return numReview;
  }

  getRestaurantAverageScore(restaurant) {
    var totalScores = 0;
    var numReview = 0;

    this.ratings.forEach(function(rating){
      if(rating.restaurant === restaurant) {
        numReview += 1;
        totalScores += Number(rating.rating);
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

  sortByAverageScoreInCategory(category){
    var self = this;
    var sorted = this.categories[category].sort(function(a, b){
      return self.getRestaurantAverageScore(b) - self.getRestaurantAverageScore(a);
    });
    return sorted;
  }
}



module.exports=RestaurantRecommender;