"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (actual) {
  return function (root, result) {
    var validOptions = (0, _utils.validateOptions)(result, ruleName, { actual: actual });
    if (!validOptions) {
      return;
    }

    root.walkRules(function (rule) {
      if (rule.selector.indexOf(":root") === -1) {
        return;
      }
      (0, _postcssSelectorParser2.default)(checkSelector).process(rule.selector);

      function checkSelector(selectorAST) {
        if (ignoreRule(selectorAST)) {
          return;
        }

        rule.walkDecls(function (decl) {
          var prop = decl.prop;

          if ((0, _utils.cssWordIsVariable)(prop)) {
            return;
          }

          if (prop.indexOf("--") !== 0) {
            (0, _utils.report)({
              message: messages.rejected(prop),
              node: decl,
              result: result,
              ruleName: ruleName
            });
          }
        });
      }
    });
  };
};

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleName = exports.ruleName = "root-no-standard-properties";

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(p) {
    return "Unexpected standard property \"" + p + "\" applied to \":root\"";
  }
});

function ignoreRule(selectorAST) {
  var ignore = false;
  selectorAST.eachInside(function (selectorNode) {
    // ignore `:root` selector inside a `:not()` selector
    if (selectorNode.value === ":root" && selectorNode.parent.parent.value === ":not") {
      ignore = true;
    }
  });
  return ignore;
}