/* global angular */
angular.module('ui').directive('uiCardSize',  
    function () {
        var extract = /(\d+)x(\d+)/;
        return {
			restrict: 'A',
            scope: {
                $uiCardSize: '@uiCardSize'
            },
			link: function(scope, element, attrs) {
                scope.$watch('$uiCardSize', function (size) {
                    var result = extract.exec(size);
                    element.attr('data-ss-colspan', result[1]);
                    element.attr('data-ss-rowspan', result[2]);
                });
			}
		}
    });
