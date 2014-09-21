vpnChooserApp.factory('UserService', function ($http, $httpProvider, $q, $base64) {

    return {
        name: null,
        api_key: null,

        login: function (name, password) {
            var self = this;
            self.name = name;
            return $q(function (resolve, reject) {

                $http({
                    method: 'GET',
                    url: '/users/' + name,
                    headers: {
                        'Authorization': 'Basic ' + $base64.encode(name + ':' + password)
                    }
                }).success(function (data, status) {
                    if (status != 200 || !data || !data.api_key) {
                        reject();
                    }
                    var api_key = data.api_key;

                    $httpProvider.defaults.header.common.Authorization = 'Basic ' + $base64.encode(
                            name + ':' + api_key
                    );
                    resolve();

                }).error(function () {
                    reject();
                });

            });
        }
    }

});