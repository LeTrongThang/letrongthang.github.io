angular.module('app.components.error.error_500')
    .config(ERROR_500);


function ERROR_500($stateProvider) {
    $stateProvider
        .state('error-500', {
            url: '/error-500',
            templateUrl: 'app/components/error/error-500/error-500.html'
        })
}