'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _inject = require('aurelia-dependency-injection');

var _customAttribute = require('aurelia-templating');

var ValidateCustomAttribute = (function () {
  function ValidateCustomAttribute(element) {
    _classCallCheck(this, _ValidateCustomAttribute);

    this.element = element;
    this.processedValidation = null;
    this.viewStrategy = null;
  }

  _createClass(ValidateCustomAttribute, [{
    key: 'valueChanged',
    value: function valueChanged(newValue) {
      if (this.value === null || this.value === undefined) {
        return;
      }this.processedValidation = this.value;
      if (typeof this.value === 'string') {
        return;
      } else {
        this.subscribeChangedHandlers(this.element);
      }
    }
  }, {
    key: 'subscribeChangedHandlers',
    value: function subscribeChangedHandlers(currentElement) {
      var _this = this;

      this.viewStrategy = this.value.config.getViewStrategy();
      var validationProperty = this.viewStrategy.getValidationProperty(this.value, currentElement);
      if (validationProperty !== null && validationProperty !== undefined) {
        this.viewStrategy.prepareElement(validationProperty, currentElement);
        validationProperty.onValidate(function (vp) {
          _this.viewStrategy.updateElement(vp, currentElement);
        });
      }
      var children = currentElement.children;
      for (var i = 0; i < children.length; i++) {
        this.subscribeChangedHandlers(children[i]);
      }
    }
  }, {
    key: 'detached',
    value: function detached() {}
  }, {
    key: 'attached',
    value: function attached() {
      if (this.processedValidation === null || this.processedValidation === undefined) this.valueChanged(this.value);
    }
  }]);

  var _ValidateCustomAttribute = ValidateCustomAttribute;
  ValidateCustomAttribute = _customAttribute.customAttribute('validate')(ValidateCustomAttribute) || ValidateCustomAttribute;
  ValidateCustomAttribute = _inject.inject(Element)(ValidateCustomAttribute) || ValidateCustomAttribute;
  return ValidateCustomAttribute;
})();

exports.ValidateCustomAttribute = ValidateCustomAttribute;