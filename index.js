
var angular = require('angularjs')
  , extend = require('extend')

  , template = require('./template');

angular.module('breadcrumb', [])

  .directive('breadcrumb', function () {
    return {
      replace: true,
      restrict: 'A',
      scope: {},
      template: template,
      link: function (scope, element, attr) {
        var name = attr.breadcrumb;
        if (attr.config) {
          if (attr.config[0] === '{') { // eval raw
            config = JSON.parse(attr.config);
          } else {
            config = scope.$parent[attr.config];
          }
        }
        config = extend({
          front: 5,
          back: 5
        }, config);
        scope.front = config.front;
        scope.back = config.back;
        scope.$parent.$watch(name, function (value, old) {
          scope.history = value;
        });
      }
    };
  });
