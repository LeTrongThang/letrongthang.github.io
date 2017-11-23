(function () {
    angular.module('app.components.setting')
        .config(Setting);

    Setting.$inject = ['$stateProvider'];
    function Setting($stateProvider) {
        $stateProvider
            .state('index.setting', {
                url: '/setting',
                templateUrl: 'app/components/setting/setting.html',
                controller: 'SettingController',
                controllerAs: 'vm',
                ncyBreadcrumb: {
                    label: 'Cài đặt'
                }
            });
    }
})();