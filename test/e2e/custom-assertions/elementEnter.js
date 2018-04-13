// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementEnter(selector, expected)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

// DG: this actually just returns the innerHTML of the selector...

exports.assertion = function (selector, value) {
  this.message = 'Testing if element <' + selector + '> has value: ' + value;
  this.expected = value;
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = function (res) {
    return res.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
        return document.querySelector(selector).innerHTML;
    }, [selector], function (res) {
      cb.call(self, res)
    })
  }

}
