// class Restaurant {
//   constructor(name, category) {
//     this.name = name;
//     this.category = category;
//   }
// }

// Restaurant.prototype.getAverageScore = function(scores) {

// }

// class User {
//   constructor(name) {
//     this.name = name;

//   }
// }

// class Category {
//   constructor(type) {
//     this.type = [];
//   }
// }

class RestaurantRecommender{
  constructor (ratings, restaurants, users, categories) {
  // All main properties should go here.
  this.ratings = [];
  this.restaurants = [];
  this.users = [];
  this.categories = {};
  }

  addRestaurant(name, category) {
  // Adds a new Restaurant to the System
  this.restaurants.push({
    name: name,
    category: category
  });
  }

  addUser(name) {
  // Adds a new User to the System
    this.users.push({
      name : name
    });
  }

  addCategory(category) {
  // Adds a new Category to the System
    this.categories[category] = [];
  }

  addRating(restaurant, user, rating){
  // Adds a user rating for a restaurant
    this.ratings.push({
      restaurant : restaurant,
      user : user, 
      rating : rating
    });
  }

  addRestauranttoCategory(restaurant, category){
  // Adds Restaurant to Category
  // Adds Category to Restaurant
    if(this.categories[category]) {
      this.categories[category].push(restaurant);
    } else {
      this.categories[category] = [];
      this.categories[category].push(restaurant);
    }
    
    this.restaurants.forEach(function(obj){
      if(obj.name === restaurant) {
        obj.category = category;
      }
    });
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




var yelp = new RestaurantRecommender ('ratings', 'restaurants', 'users', 'categories')
yelp.addRating('abcRestaurant', 'isabelle', 99);
yelp.addRestaurant('McDonalds', 'fastfood');
yelp.addUser('isabelle');
yelp.addCategory('fastfood');
yelp.addRestauranttoCategory('Panda Express', 'Chinese');
yelp.addRestauranttoCategory('McDonalds', 'fastfood');
console.log(yelp);