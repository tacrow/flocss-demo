"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (expectation) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, {
      actual: expectation,
      possible: ["lower", "upper"]
    });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {
      // Ignore keyframe selectors
      if (rule.parent.type === "atrule" && rule.parent.name === "keyframes") {
        return;
      }

      if ((0, _utils.cssRuleHasSelectorEndingWithColon)(rule)) {
        return;
      }

      function checkSelector(selectorAST) {
        selectorAST.eachTag(function (tag) {
          // Destructring the tag object
          var parent = tag.parent;
          var sourceIndex = tag.sourceIndex;
          var value = tag.value;

          // postcss-selector-parser includes the arguments to nth-child() functions
          // as "tags", so we need to ignore them ourselves.
          // The fake-tag's "parent" is actually a selector node, whose parent
          // should be the :nth-child pseudo node.

          if (parent.parent.type === "pseudo" && parent.parent.value === ":nth-child") {
            return;
          }

          // & is not a type selector: it's used for nesting
          if (value[0] === "&") {
            return;
          }

          var expectedValue = expectation === "lower" ? value.toLowerCase() : value.toUpperCase();

          if (value === expectedValue) {
            return;
          }

          (0, _utils.report)({
            message: messages.expected(value, expectedValue),
            node: rule,
            index: sourceIndex,
            ruleName: ruleName,
            result: result
          });
        });
      }

      (0, _postcssSelectorParser2.default)(checkSelector).process(rule.selector);
    });
  };
};

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "selector-type-case";

var messages = (0, _utils.ruleMessages)(ruleName, {
  expected: function expected(actual, _expected) {
    return "Expected \"" + actual + "\" to be \"" + _expected + "\"";
  }
});

exports.messages = messages;