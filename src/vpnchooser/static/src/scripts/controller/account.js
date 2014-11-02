vpnChooserControllers.controller('accountCtrl', function ($scope, UserService) {

    $scope.user = UserService;

    $scope.changePassword = function($event) {
        $event && $event.stopPropagation();

        var oldPassword = $scope.oldPassword,
            newPassword = $scope.newPassword
        ;


        UserService.changePassword(oldPassword, newPassword)
            .success(function() {
                $scope.message = {
                    header: 'Password changed',
                    text: 'Your password has been changed successfully.'
                }
            })
            .catch(function() {
                $scope.error = {
                    header: 'Password change failed',
                    text: 'Could not change your password. Please verify ' +
                        'if your old one has been entered correctly.'
                }
            })
        ;
        return false;
    }

});

