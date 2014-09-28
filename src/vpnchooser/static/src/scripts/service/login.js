vpnChooserApp.factory('UserService', function ($http, $q, $base64) {

    return {
        name: null,
        api_key: null,

        check_current: function() {
            return $http({
                method: 'GET',
                url: '/users/' + name
            });
        },


        login: function (name, password) {
            var self = this,
                defer = $q.defer();
            self.name = name;


                $http({
                    method: 'GET',
                    url: '/users/' + name,
                    headers: {
                        'Authorization': 'Basic ' + $base64.encode(name + ':' + password)
                    }
                }).success(function (data, status) {
                    if (status != 200 || !data || !data.api_key) {
                        defer.reject();
                    }
                    var api_key = data.api_key;
                    self.api_key = api_key;

                    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(
                            name + ':' + api_key
                    );
                    defer.resolve();

                }).error(function () {
                    $http.defaults.headers.common.Authorization = null;
                    defer.reject();
                });

            return defer.promise;
        }
    }

});
