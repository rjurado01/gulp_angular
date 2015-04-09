var webdriver = require("selenium-webdriver");

selenium_driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.chrome())
//  .withCapabilities(webdriver.Capabilities.phantomjs())
  .build();

var WorldConstructor = function WorldConstructor(callback) {

  var driver = selenium_driver;
  var chai = require('chai');
  var chaiWebdriver = require('chai-webdriver');
  chai.use(chaiWebdriver(driver));

  var world = {
    driver: driver,
    chai: chai,

    visit: function(url) {
      driver.get(url);
    },

    find: function(hash) {
      return driver.findElement(hash)
    },

    expect: chai.expect
  };

  callback(world); // tell Cucumber we're finished and to use our world object instead of 'this'
};

exports.World = WorldConstructor
