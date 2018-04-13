// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

var ENTER_KEY = '\uE007';
var RIGHT_ARROW = '\uE014';
var LEFT_ARROW = '\uE012';
var DOWN_ARROW = '\uE015';

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#button1')
      // simulate Enter
      .keys([ENTER_KEY])
      .assert.elementEnter(".current", "button1")
      .keys([DOWN_ARROW])
      .keys([DOWN_ARROW])
      .keys([DOWN_ARROW])
      // 3 downs is button 4
      // assert correct behavior
      .assert.elementNavigate('button4')
      // right is always button 6
      .keys([RIGHT_ARROW])
      .assert.elementNavigate('button6')
      // 3 downs is button 9
      .keys([DOWN_ARROW])
      .keys([DOWN_ARROW])
      .keys([DOWN_ARROW])
      .assert.elementNavigate('button9')
      // left is always button 1
      .keys([LEFT_ARROW])
      .assert.elementNavigate('button1')
      .end()
  }
}
