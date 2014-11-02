/**
 * service/vpn.js
 *
 * The Service to get vpns from the backend.
 */


var vpnServices = angular.module('vpnServices', ['ngResource']);

vpnServices.factory(
    'Vpn',
    function($resource) {
        return $resource('/vpns/:id', {}, {
            query: {
                method: 'GET',
                params:{

                } ,
                isArray: true
            },
            'update': { method:'PUT' }
        });
    }
);
