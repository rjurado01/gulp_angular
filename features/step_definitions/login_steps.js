var loginSteps = function () {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.Given("I visit login page", function(callback) {
    this.visit('http://localhost:8080');
    this.expect('#email').dom.to.be.visible();
    this.expect('#password').dom.to.be.visible().then(callback);
  });

  this.When("I click 'Sign in' button", function(callback) {
    this.expect('#login_submit').dom.to.have.count(1);
    this.find({id: 'login_submit'}).click();
    callback();
  });

  this.When("I fill in login form", function(callback) {
    this.find({id: 'email'}).sendKeys('aa@bb.com');
    this.find({id: 'password'}).sendKeys('123');
    this.expect('#email').dom.to.have.value('aa@bb.com');
    this.expect('#password').dom.to.have.value('123').then(callback);
  });
};

module.exports = loginSteps;
