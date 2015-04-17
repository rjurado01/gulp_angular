var webdriverio =     require("webdriverio"),
    chai =            require('chai'),
    chaiAsPromised =  require("chai-as-promised");

webdriver = new webdriverio.remote({
  desiredCapabilities: {
    browserName: 'chrome'
  }
});

chai.should();
chaiAsPromised.transferPromiseness = webdriver.transferPromiseness;
chai.use(chaiAsPromised);

var WorldConstructor = function WorldConstructor(callback) {
  var world = {
    driver: webdriver,
    chai: chai,

    visit: function(url) {
      webdriver.url(url);
    },

    find: function(id) {
      return webdriver.element(id);
    },

    click: function(id) {
      return webdriver.click(id);
    },

    text: function(id) {
      return webdriver.getText(id);
    }
  };

  webdriver.init().then(function() {
    // tell Cucumber we're finished and to use our world object instead of 'this'
    callback(world);
  });
};

exports.World = WorldConstructor
