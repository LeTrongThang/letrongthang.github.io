angular.module('app.components.auth.login')
    .config(Login);

Login.$inject = ['$stateProvider'];
function Login($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/auth/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        });
}
