(function () {
    "use strict";

    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, appConfigs) {

            RestangularProvider.setBaseUrl(appConfigs.API.BASE_URL);
            $httpProvider.interceptors.push('httpInterceptor');
            $urlRouterProvider
                .otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    $state.go('index.control');
                })
        });

})();