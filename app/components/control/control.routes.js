(function () {
    angular.module('app.components.control')
        .config(Control);

    Control.$inject = ['$stateProvider'];
    function Control($stateProvider) {
        $stateProvider
            .state('index.control', {
                url: '/control',
                templateUrl: 'app/components/control/control.html',
                controller: 'ControlController',
                controllerAs: 'vm',
                 ncyBreadcrumb: {
                label: 'Điều khiển'
            }
            });
    }
})();