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