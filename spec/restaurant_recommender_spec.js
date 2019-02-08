describe("RestaurantRecommender", function() {
  var RestaurantRecommender = require('../restaurant_recommender.js');
  var rr;

  beforeEach(function() {
    rr = new RestaurantRecommender();
  });

  describe("User", function() {
    it("should add a user object to User", function() {
      expect(rr.users.length).toEqual(0);
      rr.addUser('Isabelle');
      expect(rr.users.length).toEqual(1);
    });

    it("should set username", function() {
      rr.addUser('Isabelle');
      expect(rr.users[0].userName).toEqual('Isabelle');
    });

    it("should delete user object with a method deleteUser(userName)", function() {
      rr.addUser('isabelleyiu');
      rr.addUser('kelly');
      expect(rr.users.length).toEqual(2);
      rr.deleteUser('kelly');
      expect(rr.users.length).toEqual(1);
    });
  });

  // describe("Restaurant", function() {
  //   it("should add a user object to User", function() {
  //     rr.addUser('Isabelle');
  //     expect(rr.users.length).toEqual(1);
  //   });

  //   it("should set username", function() {
  //     rr.addUser('Isabelle');
  //     expect(rr.users[0].userName).toEqual('Isabelle');
  //   });
  // });
});