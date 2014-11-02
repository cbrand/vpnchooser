
vpnChooserControllers.controller('menuCtrl', function($scope, UserService) {

    $scope.isAuthenticated = function() {
        return UserService.authenticated;
    };

});
