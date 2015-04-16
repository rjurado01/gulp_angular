var myAfterHooks = function () {
  this.After(function(callback) {
    webdriver.end(callback);
  });

  this.registerHandler('AfterFeatures', function (event, callback) {
    webdriver.endAll(callback);
  });
};

module.exports = myAfterHooks;
