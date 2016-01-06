/* global angular */
/* global $ */


angular.module('ui').directive('uiGroup', ['$timeout', '$interpolate', 'uiSizes', function($timeout, $interpolate, sizes) {
        var options = {
            columns: 6,
            colWidth: sizes.sx,
            gutterX: sizes.gx,
            gutterY: sizes.gy,
            paddingX: sizes.px,
            paddingY: sizes.py,
            minHeight: sizes.sy+2*sizes.gy,
            //handle: '.drag-handle',
            enableResize: false,
            enableCrossDrop: false,
            align: 'left'
        };
    
        createStyleAndAppendToDocument($interpolate, sizes);
        
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'components/ui-group/ui-group.html',
            link: function(scope, element, attrs) {
                element = $(element).find('.group-container');
                element.shapeshift(options);
                
                $timeout(function() {
                    element.shapeshift(options);
                }, 0);
            }
        };
    }]);
    
function createStyleAndAppendToDocument($interpolate, sizes) {
    var cssTemplate = 
        ".group-container {"+
        "width: {{sx*6+gx*5+px*2}}px;"+
        //"border: 1px dashed green;"+
        "position: relative;"+
        "}"+
        
        ".group-container > * {"+
        "margin: 0 !important;"+
        "width: {{sx}}px !important;"+
        "height: {{sy}}px !important;"+
        "position: absolute;"+
        "}"+

        ".group-container > [data-ss-colspan='2'] { width: {{sx*2+gx*1}}px !important; }"+
        ".group-container > [data-ss-colspan='3'] { width: {{sx*3+gx*2}}px !important; }"+
        ".group-container > [data-ss-colspan='4'] { width: {{sx*4+gx*3}}px !important; }"+
        ".group-container > [data-ss-colspan='5'] { width: {{sx*5+gx*4}}px !important; }"+
        ".group-container > [data-ss-colspan='6'] { width: {{sx*6+gx*5}}px !important; }"+
        
        ".group-container > [data-ss-rowspan='2'] { height: {{sy*2+gy*1}}px !important; }"+
        ".group-container > [data-ss-rowspan='3'] { height: {{sy*3+gy*2}}px !important; }"+
        ".group-container > [data-ss-rowspan='4'] { height: {{sy*4+gy*3}}px !important; }"+
        ".group-container > [data-ss-rowspan='5'] { height: {{sy*5+gy*4}}px !important; }"+
        ".group-container > [data-ss-rowspan='6'] { height: {{sy*6+gy*5}}px !important; }"+

        ".group-container .ss-placeholder-child {"+
        "background: transparent;"+
        "border: 1px dashed red;"+
        "}";
        
    var cssStyle = $interpolate(cssTemplate)(sizes);
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
        style.styleSheet.cssText = cssStyle;
    else
        style.appendChild(document.createTextNode(cssStyle));
    head.appendChild(style);        
}