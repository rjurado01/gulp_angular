var generalSteps = function() {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.When(/^I wait (\d+.?\d*) seconds$/, function(seconds, callback) {
    this.driver.sleep(parseFloat(seconds) * 1000);
    callback();
  });
};

module.exports = generalSteps;
