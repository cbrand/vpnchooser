vpnChooserControllers.controller('usersCtrl', function ($scope, $location, User, UserService) {

    $scope.user_service = UserService;
    if(!UserService.is_admin) {
        $location.path('/');
        return;
    }

    $scope.users = User.query();


});

vpnChooserControllers.controller('userCtrl', function($scope, $location, $element) {

    $scope.changePassword = function() {
        $location.path('/users/' + $scope.user.name + '/changepw');
    }

});
