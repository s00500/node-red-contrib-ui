/* global angular */
angular.module('ui').directive('uiCardSize', ['uiSizes', 
    function(sizes) {
        return {
			restrict: 'A',
            require: '^uiCardPanel',
			link: function(scope, element, attrs, controller) {
                attrs.$observe('uiCardSize', function () {
                    controller.refreshLayout();
                });
			}
		}
    }]);
