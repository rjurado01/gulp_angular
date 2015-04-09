var myAfterHooks = function () {
  this.After(function(callback) {
    callback();
  });

  this.registerHandler('AfterFeatures', function (event, callback) {
    selenium_driver.close();
    callback();
  });
};

module.exports = myAfterHooks;
