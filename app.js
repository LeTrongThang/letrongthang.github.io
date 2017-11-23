(function () {
    "use strict";

    angular.module('app', [
        'ui.router',
        'ngStorage',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'restangular',
        'app.themeDirectives',
        'app.services',
        'app.appDirectives',
        'app.filters',
        'app.components'
    ]);
})();
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
(function () {
    "use strict";

    angular.module('app')
        .run(function ($rootScope, $state, appConfigs, $localStorage, $sessionStorage) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name != toState.name && toState.name != 'login') {
                    if (!$localStorage.accessToken) {
                        $state.go('login');
                        event.preventDefault();
                        return;
                    }
                }
                if (toState.redirectTo) {
                    $state.go(toState.redirectTo, toParams);
                    event.preventDefault();
                }
            });
            $rootScope.appConfigs = appConfigs;
        })
        .factory('WatsonIoT', function () {
            return IBMIoTF.IotfApplication;
        });
})();
(function () {
    "use strict";

    angular.module('app')
        .constant('appConfigs', {
            API: {
                BASE_URL: "http://localhost:3000/api/v1/",
                SERVER_URL: "http://localhost:3000",
                USER: {
                    BASE: "user/",
                    CUSTOMER: "customer/",
                    DRIVER: "driver/"
                },
                ADMIN: {
                    BASE: "admin/",
                    ORDER: "orders/"
                },
                ORDER: {
                    BASE: "orders/",
                    CANCEL: "cancel/",
                    GET_ESTIMATION: "order-estimation/",
                },
                EXTRA_SERVICE: {
                    BASE: "extra_service/"
                },
                FEEDBACK: {
                    BASE: "feedback/"
                },
                AUTH: {
                    BASE: 'auth/',
                    LOGIN: 'login-admin/',
                    VALIDATE_TOKEN: "validate-access-token/",
                    REFRESH_TOKEN: "refresh-token/"
                },
                GLOBAL_SETTINGS: {
                    BASE: "global-settings/",
                    LOGIN_KEY: "login-key/"
                }
            },

            paginationMaxPage: 5,

            listRow: [
                { key: 20, value: '20' },
                { key: 40, value: '40' },
                { key: 60, value: '60' },
                { key: 0, value: 'All' }
            ]
        });

})();