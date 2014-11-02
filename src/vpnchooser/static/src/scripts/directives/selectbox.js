/**
 * directives/selectbox.js
 *
 * Directives to render a semantic-ui select
 * box correctly.
 */

vpnChooserApp.directive('ngSelectBox', function () {
    return {
        restrict: 'AE',
        require: '^ngModel ^ngName ^ngCollection ^ngCollectionKey ngCollectionText',
        template: '',
        scope: {
            ngModel: '=',
            ngName: '@',
            ngCollection: '=',
            ngCollectionKey: '@',
            ngCollectionText: '@'
        },
        replace: true,
        controller: function($scope) {

            Object.defineProperty($scope, 'selectedText', {
                get: function() {
                    var typeKey = $scope.ngModel,
                        selectedItems = $scope.ngCollection.filter(
                            function (item) {
                                return item[$scope.ngCollectionKey] == typeKey;
                            }
                        );
                    if(selectedItems.length) {
                        return selectedItems[0][$scope.ngCollectionText];
                    }
                    else {
                        return $scope.ngCollectionDefaultText || '';
                    }
                }
            });

            $scope.selectItem = function(item) {
                $scope.ngModel = item[$scope.ngCollectionKey];
            };

        },
        templateUrl: 'src/partials/directives/select_box.html'
    }
});
