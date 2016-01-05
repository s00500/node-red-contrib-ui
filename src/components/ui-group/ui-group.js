/* global $ */
angular.module('ui').directive('uiGroup', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $(element).shapeshift(scope.$eval(attrs.uiGroup));
            }
        };
    }
);