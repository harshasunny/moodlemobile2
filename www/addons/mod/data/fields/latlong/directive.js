// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mod_data')

.filter('mmaModDataFieldLatLongFormat', function() {
    return function(value) {
        var north = (value && parseFloat(value.content)) || "",
            east = (value && parseFloat(value.content1)) || "";

        if (north !== '' || east !== '') {
            north = north ? north.toFixed(4) : '0.0000';
            east = east ? east.toFixed(4) : '0.0000';

            var latitude = north < 0 ? -north + '°S' : north + '°N',
                longitude = east < 0 ? -east + '°W' : east + '°E',
                link = ionic.Platform.isAndroid() ? 'geo:' + north + ',' + east :
                            'http://maps.apple.com/?ll=' + north + ',' + east + '&near=' + north + ',' + east;

            return '<a href="' + link + '">' + latitude + ' ' + longitude + '</a>';
        }
    };
})

/**
 * Directive to render data latlong field.
 *
 * @module mm.addons.mod_data
 * @ngdoc directive
 * @name mmaModDataFieldLatlong
 */
.directive('mmaModDataFieldLatlong', function() {
    return {
        restrict: 'A',
        priority: 100,
        templateUrl: 'addons/mod/data/fields/latlong/template.html',
        link: function(scope) {
            scope.mode = scope.mode == 'list' ? 'show' : scope.mode;
            if (scope.value) {
                if (scope.mode == 'edit') {
                    scope.north = (scope.value && parseFloat(scope.value.content)) || "";
                    scope.east = (scope.value && parseFloat(scope.value.content1)) || "";
                }
            }
        }
    };
});
