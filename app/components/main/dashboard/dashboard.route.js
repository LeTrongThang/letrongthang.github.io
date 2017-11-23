angular.module('app.components.main.dashboard')
    .config(DashboardRoute);


function DashboardRoute($stateProvider) {
    $stateProvider
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: 'app/components/main/dashboard/dashboard.html',
            ncyBreadcrumb: {
                label: 'SIDEBAR.DASHBOARD'
            }
        })
}