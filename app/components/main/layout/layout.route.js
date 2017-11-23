angular.module('app.components.main.layout')
    .config(Layout);

Layout.$inject = ['$stateProvider'];
function Layout($stateProvider) {
    $stateProvider
        .state('index', {
            templateUrl: 'app/components/main/layout/layout.html',
            redirectTo: 'index.dashboard',
            controller: 'LayoutController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'HOME'
            }
        });
}