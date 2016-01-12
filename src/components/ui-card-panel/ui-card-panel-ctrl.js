/* global angular */
/* global $ */
angular.module('ui').controller('uiCardPanelController', ['uiSizes', '$timeout', 
    function(sizes, $timeout) {
        this.width = sizes.columns * sizes.sx + sizes.px * 2 + (sizes.columns - 1) * sizes.gx;
        this.height = 500;
        
        var root;       
        this.init = function (rootElement) {
            root = rootElement;
        };
        
        var refreshInProgress = false;
        this.refreshLayout = function() {
            if (refreshInProgress) return;
            refreshInProgress = true;
            $timeout(function() {
                refreshSizes();
                refreshInProgress = false;
            }, 0);
        };

        var extract = /(\d+)x(\d+)/;
        var occupied;
        function refreshSizes() {
            occupied = [];
            root.children().each(function () {
                var child = $(this);
                var size = child.attr('ui:card-size') || child.attr('ui-card-size');
                var result = extract.exec(size);
                var width = parseInt(result[1]);
                var height =  parseInt(result[2]);
                var position = getNextPosition(width, height);
                child.css({
                    left: position.left, 
                    top: position.top,
                    width: sizes.sx * width + sizes.gx * (width-1),
                    height: sizes.sx * height + sizes.gy * (height-1)
                }); 
            });
        }

        function getNextPosition(width, height) {
            var pos = getFreeAndOccupy(width, height);
            return {
                top: sizes.py + pos.y * sizes.sy + pos.y * sizes.gy,
                left: sizes.px + pos.x * sizes.sx + pos.x * sizes.gx
            }
        }
        
        function getFreeAndOccupy(width, height) {
            var maxx = sizes.columns-width;
            for (var y=0;y<1000;y++)
                for (var x=0;x<=maxx;x++) {
                    if (isFree(x, y, width, height)) {
                        occupy(x,y,width,height);
                        return {x:x, y:y};
                    }
                }
        }
        
        function occupy(x, y, width, height) {
            for (var dy=0; dy<height; dy++) {
                var existing = occupied[y+dy];
                if (!existing) occupied[y+dy] = existing = new Array(sizes.columns);
                for (var dx=0; dx<width; dx++)
                    existing[x+dx] = true;
            }
        }
        
        function isFree(x, y, width, height) {
            for (var dy=0;dy<height; dy++) {
                var existing = occupied[y+dy];
                if (!existing) continue;
                for (var dx=0;dx<width;dx++)
                if (existing[x+dx])
                    return false;
            }
            
            return true;
        }
    }]);


