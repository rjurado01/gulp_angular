var homeSteps = function () {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.Given("I visit home page", function(callback) {
    this.visit('http://localhost:8080/#/home');
    callback();
  });

  this.Then(/^I should see my email$/, function (callback) {
    this.expect('body').dom.to.contain.text('aa@bb.com').then(callback);
  });

  this.Then(/^I should see colors list$/, function (callback) {
    this.expect('body').dom.to.contain.text('Post 1')
    this.expect('body').dom.to.contain.text('Post 2')
    this.expect('body').dom.to.contain.text('Post 3').then(callback);
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

  this.Then(/^I should( not)? be redirected to home page$/, function(negation, callback) {
    this.driver.getCurrentUrl().then(function(url) {
      if( !negation && url == 'http://localhost:8080/#/home')
        callback();
      else if( negation && url != 'http://localhost:8080/#/home')
        callback();
      else
        callback.fail(new Error("Expected to be on route '/home'"));
    });
  });
};

module.exports = homeSteps;
