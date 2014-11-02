/**
 * directives/selectbox.js
 *
 * Directives to render a semantic-ui select
 * box correctly.
 */

vpnChooserApp.directive('ngSelectBox', function ($timeout) {
    return {
        restrict: 'AE',
        require: '^ngModel ^ngName ^ngCollection ^ngCollectionKey ngCollectionText',
        template: '',
        scope: {
            ngModel: '=',
            ngName: '@',
            ngCollection: '=',
            ngCollectionKey: '@',
            ngCollectionText: '@',
            ngCollectionDefaultText: '@',
            ngChoose: '&'
        },
        replace: true,
        controller: function($scope, $element) {
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
                var newKey = item[$scope.ngCollectionKey];
                if($scope.ngModel != newKey) {
                    $scope.ngModel = newKey;
                    $timeout(function() {
                        $scope.ngChoose && $scope.ngChoose(newKey);
                    });
                }
            };

            $timeout(function() {
                $($element).dropdown()
                ;
            });

        },
        templateUrl: 'src/partials/directives/select_box.html'
    }
});
