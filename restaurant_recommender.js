class RestaurantRecommender() {
  constructor() {
  // All main properties should go here.
  this.ratings = {};
  this.restaurants = {};
  this.users = {};
  }

  addRestaurant() {
  // Adds a new Restaurant to the System
  }

  addUser() {
  // Adds a new User to the System
  }

  addCategory() {
  // Adds a new Category to the System
  }

  addRating(){
  // Adds a user rating for a restaurant
  }

  addRestauranttoCategory(){
  // Adds Restaurant to Category
  // Adds Category to Restaurant
  }


  deleteUser() {
  // Deletes a User from the system
  // Deletes User ratings for a restaurant.
  }

  deleteRestaurant() {
  // make sure to also delete a restaurant from the categories.
  }

  deleteCategory() {
  // make sure to delete categories from a restaurant that had them.
  }

  filter(){
  }
}