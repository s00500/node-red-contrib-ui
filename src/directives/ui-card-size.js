/* global angular */
angular.module('ui').directive('uiCardSize', ['$interpolate', 
    function ($interpolate) {
        var extract = /(\d+)x(\d+)/;
        return {
			restrict: 'A',
			link: function(scope, element, attrs) {
                var size = $interpolate(attrs.uiCardSize)(scope);
                var result = extract.exec(size);
				element.attr('data-ss-colspan', result[1]);
                element.attr('data-ss-rowspan', result[2]);
			}
		}
    }]);
