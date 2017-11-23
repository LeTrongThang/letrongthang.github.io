(function () {
    'use strict';

    angular.module('app.services')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$localStorage', '$injector', '$q', 'appConfigs'];
    function httpInterceptor($localStorage, $injector, $q, appConfigs) {


        return {
            request: function (config) {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = $localStorage.accessToken;
                    config.timeout = 30000;//30 seconds
                }
                return config;
            },
            responseError: function (rejection) {
                var deferred = $q.defer();

                if (rejection.status == 401) {
                    if (rejection.data && rejection.data.message == 'Invalid token: access token has expired' && rejection.config.url != (appConfigs.API.BASE_URL + appConfigs.API.AUTH.VALIDATE_TOKEN)) {
                        $injector.get("authService").refreshAccessToken().then(function (res) {
                            $localStorage.accessToken = res.token_type + " " + res.access_token;
                            $localStorage.refreshToken = res.refresh_token;
                            callApi(rejection.config).then(function (response) {
                                deferred.resolve(response);
                            }, function (error) {
                                deferred.reject(error);
                            });
                        }, function (err) {
                            deferred.reject(err);
                        });
                    } else {
                        $localStorage.$reset();
                        $localStorage.errorMessage = rejection.data.message;
                        $injector.get("$state").go("login");
                        rejection.data = null;
                        deferred.reject(rejection);
                    }
                } else if (rejection.data && (rejection.data.message == "Invalid grant: refresh token is invalid" || rejection.data.message == "Invalid grant: refresh token has expired")) {
                    $localStorage.$reset();
                    $localStorage.errorMessage = rejection.data.message;
                    $injector.get("$state").go("login");
                    rejection.data = null;
                    deferred.reject(rejection);
                } else if (rejection.status == -1) {
                    deferred.reject(rejection);
                } else {
                    deferred.reject(rejection);
                }

                return deferred.promise;
            }
        };

        function callApi(config) {
            var Restangular = $injector.get("Restangular")
                .withConfig(function (RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl(appConfigs.API.BASE_URL);
                    RestangularConfigurer.setFullResponse(true);
                });
            var path = config.url.replace(appConfigs.API.BASE_URL, "");

            var deferred = $q.defer();

            if (config.method == 'POST') {
                if (!config.headers['Content-Type']) {

                    Restangular.all(path)
                        .withHttpConfig({ transformRequest: angular.identity })
                        .customPOST(config.data, undefined, undefined,
                        { 'Content-Type': undefined })
                        .then(function (res) {
                            deferred.resolve(res);
                        }, function (err) {
                            deferred.reject(err);
                        });
                } else {

                    Restangular.all(path)
                        .post(config.data)
                        .then(function (res) {
                            deferred.resolve(res);
                        }, function (err) {
                            deferred.reject(err);
                        });
                }
            } else if (config.method == 'GET') {
                Restangular.one(path)
                    .get()
                    .then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
            } else if (config.method == 'PATCH') {
                Restangular.one(path)
                    .patch(config.data)
                    .then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
            } else {
                Restangular.all(path)
                    .put(config.data)
                    .then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        }
    };
})();