/**
 * app.js
 *
 * Application javascript controller for base angular.
 */

var vpnChooserApp = angular.module('vpnChooserApp', [
    'vpnChooserControllers',
    'ui.router',
    'base64',
    'ngResource',
    'LocalStorageModule'
]);


vpnChooserApp.config(function ($stateProvider, $urlRouterProvider, $resourceProvider, localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('scnet.vpnchooser');

    $resourceProvider.defaults.stripTrailingSlashes = false;

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            controller: 'indexCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'src/partials/login.html',
            controller: 'loginCtrl'
        })
        .state('vpnList', {
            url: '/vpns',
            templateUrl: 'src/partials/vpns.html',
            controller: 'vpnsCtrl'
        })
        .state('deviceList', {
            url: '/devices',
            templateUrl: 'src/partials/devices.html',
            controller: 'devicesCtrl'
        }).state('logout', {
            url: '/logout',
            controller: 'logoutCtrl'
        }).state('account', {
            url: '/account',
            templateUrl: 'src/partials/account.html',
            controller: 'accountCtrl'
        }).state('users', {
            url: '/users',
            templateUrl: 'src/partials/users.html',
            controller: 'usersCtrl'
        })
    ;
}).factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
    return {
        response: function (response) {
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                if (!/\/users\/.*$/.exec(rejection.config.url) && !rejection.config.method == "PUT") {
                    console.log("Response Error 401", rejection);
                    $location.path('/login').search('returnTo', $location.path());
                }
            }
            return $q.reject(rejection);
        }
    }
}])
    .config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }])
    .run(function (UserService) {
        UserService.isAuthenticated();
    });
