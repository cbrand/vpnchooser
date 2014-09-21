/**
 * service/user.js
 *
 * The Service to get users from the backend.
 */


var userServices = angular.module('userServices', ['ngResource']);

userServices.factory(
    'User',
    function($resource) {
        return $resource('users/:user_name', {}, {
            query: {
                method: 'GET',
                params:{
                    'user_name': 'users'
                } ,
                isArray: true
            }
        });
    }
);
