vpnChooserControllers.controller('loginCtrl', function ($scope, $location, UserService) {

    $scope.login = function () {
        UserService
            .login($scope.user_name, $scope.password)
            .then(function () {
                $location.path('/');
            }).catch(function () {
                $scope.login_form.$setValidity('', false);
            })
        ;
    }

});
