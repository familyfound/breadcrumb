
var angular = require('angularjs')
  , extend = require('extend')
  , query = require('query')
  , tip = require('tip')

  , template = require('./template');

var helpText = "<b>Navigation History:</b> Keep track of how you got to this person.<br>" +
  "The icons represent the relationship between people<br>" +
  "<span class='uline'>Person</span> <i class='icon pedigree-up'></i> <span class='uline'>Ancestor</span><br>" +
  "<span class='uline'>Person</span> <i class='icon pedigree-down'></i> <span class='uline'>Child</span><br>" +
  "<span class='uline'>Person</span> <i class='icon pedigree-side'></i> <span class='uline'>Spouse</span><br>";

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

        // Status Help
        var helpTip = new tip(helpText);
        helpTip.attach(query('i.breadcrumb-help', element[0]));
        helpTip.position('west');
        helpTip.classname = 'breadcrumb-tip';
      }
    };
  });
