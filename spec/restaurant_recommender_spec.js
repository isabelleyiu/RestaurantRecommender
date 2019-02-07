describe("RestaurantRecommender", function() {
  var RestaurantRecommender = require('../restaurant_recommender.js');
  var rr;

  beforeEach(function() {
    rr = new RestaurantRecommender();
  });

  describe("User", function() {
    it("should add a user object to User", function() {
      rr.addUser('Isabelle');
      expect(rr.users.length).toEqual(1);
    });

    it("should set username", function() {
      rr.addUser('Isabelle');
      expect(rr.users[0].userName).toEqual('Isabelle');
    });
  });
});