$(document).ready(function(){

  var yelp = new RestaurantRecommender();

  loadRestaurant(yelp);
  createCategoryOptions(yelp);
  
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

  // Select a category option, show all options for selected category
  $('select').on('change', function() {
    var selectedCategory = $('#category-select').find(":selected").text();

    // adding new user to search restaurants by category
    var results = yelp.sortByAverageScoreInCategory(selectedCategory);
    console.log(results);
    // console.log(results);

    $('#search-results').empty();

    var ul = $('<ul>');
    // render result inside searchResult div
    results.forEach(function(restaurant, i){
      // $('#searchResult').prepend('<div>' + result[i] + '</div>');
      var li = $('<li>').text(restaurant).attr('data-index', i)
      $(ul).append(li);
      
      console.log(restaurant);
    });
    $('#search-results-wrap').removeClass('hide');
    $('#search-results').append(ul);

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
  })

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

    createCategoryOptions(yelp);
  });

  // load dummy data 
  function loadRestaurant(yelp){
    if(yelp.ratings.length === 0){
      // look through dummy data
      dummyData.forEach(function(rating){
        yelp.addRating(rating.restaurant, rating.category, rating.user, rating.rating);
      });
      console.log(yelp)
    }
  }
  
  // add options fot category from drop down in HTML
  function createCategoryOptions(yelp){
    var $categorySelect = $('#category-select');
    // remove all categories b4 adding new one 
    $categorySelect.empty();
  
    // craete an empty option 
    // so that the select isn't defaulted to any one category
    var option = $('<option>');
    $categorySelect.append(option);

    for (var key in yelp.categories) {
      if (yelp.categories.hasOwnProperty(key)) {
        // Do things here
        // console.log(key);
        var categoryName = key;
        var option = $('<option>').text(key).val(key);
      
        $categorySelect.append(option);
      }
    }
  }
  
  


});