var generalSteps = function() {
  // overwrite default World constructor
  this.World = require("../support/world.js").World;

  this.When(/^I wait (\d+.?\d*) seconds$/, function(seconds, callback) {
    this.driver.pause(parseFloat(seconds) * 1000).then(callback);
  });
};

module.exports = generalSteps;
