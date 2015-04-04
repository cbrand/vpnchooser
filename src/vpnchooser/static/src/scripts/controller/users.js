vpnChooserControllers.controller('usersCtrl', function ($scope, $location, User, UserService) {

    $scope.user_service = UserService;
    if(!UserService.is_admin) {
        $location.path('/');
        return;
    }

    $scope.users = User.query();


});

vpnChooserControllers.controller('userCtrl', function($scope, $location, $stateParams, $timeout, User, UserService) {

    if($stateParams.userName) {
        User.get({
            name: $stateParams.userName
        }, function(user) {
            $scope.user = user;
        });
    }

    $scope.moveToChangePassword = function() {
        $location.path('/users/' + $scope.user.name + '/change-password');
    }

    $scope.changePassword = function() {
        var password = $scope.newPassword || "";
        if(!password) {
            $scope.error = {
                    header: 'Password must not be empty',
                    text: 'The password field must not be empty.',
                    timeout: $timeout(function() {
                        $scope.error = null;
                    }, 5000)
                };
            return;
        }

        $scope.error = null;
        UserService.changePasswordAdmin(
            $scope.user.name,
            password
        ).then(function() {
                $scope.message = {
                    header: 'Password successfully changed',
                    text: 'The password has been changed successfully.',
                    timeout: $timeout(function() {
                        $scope.message = null;
                    }, 5000)
                }
            }, function() {
                $scope.error = {
                    header: 'Failed when communicating with the server',
                    text: 'Could not change password. The connection ' +
                    'with the server failed.',
                    timeout: $timeout(function() {
                        $scope.error = null;
                    }, 5000)
                }
            });
    }

});
