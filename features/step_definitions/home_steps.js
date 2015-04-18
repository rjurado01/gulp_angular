var homeSteps = function () {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.Given("I visit home page", function(callback) {
    this.visit('http://localhost:8080/#/home');
    callback();
  });

  this.Then(/^I should see my email$/, function (callback) {
    this.expect(this.driver.getText('body'))
      .eventually.contain('aa@bb.com').notify(callback);
  });

  this.Then(/^I should see colors list$/, function (callback) {
    this.expect(this.text('body')).eventually.contain('Post 1');
    this.expect(this.text('body')).eventually.contain('Post 2');
    this.expect(this.text('body')).eventually.contain('Post 3').notify(callback);
  });

  this.When(/^I click 'Push me' button$/, function (callback) {
    this.click('#push_me').then(callback);
  });

  this.Then(/^I see alert message$/, function (callback) {
    this.driver.alertAccept(callback);
  });

  this.Then(/^I should( not)? be redirected to home page$/, function(negation, callback) {
    var url = 'http://localhost:8080/#/home';

    if( negation ) {
      this.expect(this.driver.url().then(function(url) { return url.value; }))
        .not.eventually.equal(url).notify(callback);
    }
    else {
      this.expect(this.driver.url().then(function(url) { return url.value; }))
        .eventually.equal(url).notify(callback);
    }
  });
};

module.exports = homeSteps;
