var loginSteps = function () {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.Given("I visit login page", function(callback) {
    this.visit('http://localhost:8080');
    this.driver.isVisible('#email').should.eventually.be.true;
    this.driver.isVisible('#password').should.eventually.be.true.notify(callback);
  });

  this.When("I click 'Sign in' button", function(callback) {
    this.click('#login_submit').then(callback);
  });

  this.When("I fill in login form", function(callback) {
    this.driver.setValue('#email', 'aa@bb.com');
    this.driver.setValue('#password', '123').then(callback);
  });
};

module.exports = loginSteps;
