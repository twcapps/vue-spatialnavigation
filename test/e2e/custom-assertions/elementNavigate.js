// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementEnter(selector, expected)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

// DG: this just asserts the selector has a class focus

exports.assertion = function (expected) {
  this.message = 'Testing if element <' + expected + '> has class .focus';
  this.expected = expected;
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = function (res) {
    return res.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
      return document.querySelector('.focus').id
    },
    // 'arguments array to be passed' ??
    [],
    function (res) {
      cb.call(self, res)
    })
  }
}
