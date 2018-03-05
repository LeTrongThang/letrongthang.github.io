angular.module('app.components.auth.login')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$state', '$localStorage', 'authService', 'messageShow', '$timeout'];
function LoginController($state, $localStorage, authService, messageShow, $timeout) {

    var vm = this;
    vm.email = "";
    vm.password = "";
    vm.login = login;
    vm.isValidUserLogin = false;

    init();
    function init() {
        if ($localStorage.errorMessage) {
            globalSettingService.getLoginKey();
            messageShow.error($localStorage.errorMessage);
            $timeout(function () {
                delete $localStorage.errorMessage;
            }, 3000);
        }
    }

    function login() {
        var userInfo = {
            username: vm.email,
            password: vm.password,
            grant_type: "password"
        }
        function onSuccess(res) {
            $localStorage.accessToken = res.token_type + " " + res.access_token;
            // $localStorage.refreshToken = res.refresh_token;
            $state.go('index.control');
        }
        function onError(err) {
            messageShow.error(err.data && err.data.message || err || 'Something went wrong!');
        }
        authService.login(userInfo).then(onSuccess, onError);
    }

}
