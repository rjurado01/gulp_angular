var homeSteps = function () {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.Given("I visit home page", function(callback) {
    this.visit('http://localhost:8080/#/home');
    callback();
  });

  this.Then(/^I should see my email$/, function (callback) {
    this.expect('body').dom.to.contain.text('aa@bb.com')
    callback();
  });

  this.Then(/^I should see colors list$/, function (callback) {
    this.expect('body').dom.to.contain.text('Red')
    this.expect('body').dom.to.contain.text('Green')
    this.expect('body').dom.to.contain.text('Blue')
    callback();
  });

  this.When(/^I click 'Push me' button$/, function (callback) {
    this.find({id: 'push_me'}).click()
    callback();
  });

  this.Then(/^I see alert message$/, function (callback) {
    var alert_msg = this.driver.switchTo().alert();
    alert_msg.accept();
    callback();
  });
};

module.exports = homeSteps;
