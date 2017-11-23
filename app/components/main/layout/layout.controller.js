angular.module('app.components.main.layout')
    .controller('LayoutController', LayoutController);


function LayoutController($rootScope, $state, $localStorage, $sessionStorage) {
    var vm = this;

    vm.logOut = logOut;

    function logOut() {
        delete $localStorage.token;
        delete $sessionStorage.token;
        $state.go('login');
    }
}
