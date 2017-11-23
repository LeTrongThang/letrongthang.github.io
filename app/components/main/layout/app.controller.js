angular.module('app.components.main.layout')
    .controller('AppController', AppController);

function AppController($scope, $rootScope, $state, appConfigs) {
    $rootScope.style = 'style1';
    $scope.data = {};
    $scope.effect = '';
    $scope.appConfigs = appConfigs;
    $rootScope.$state = $state;
    $rootScope._ = _;
    $scope.header = {
        form: false,
        chat: false,
        theme: false,
        footer: true,
        history: false,
        animation: '',
        boxed: '',
        layout_menu: '',
        theme_style: 'style1',
        header_topbar: 'header-fixed',
        //header_topbar: 'static',
        menu_style: 'sidebar-default',
        menu_collapse: '',
        layout_horizontal_menu: '',

        toggle: function (k) {
            switch (k) {
                case 'chat':
                    $scope.header.chat = !$scope.header.chat;
                    break;
                case 'form':
                    $scope.header.form = !$scope.header.form;
                    break;
                case 'sitebar':
                    $scope.header.menu_style = $scope.header.menu_style ? '' : (($scope.header.layout_menu === '') ? 'sidebar-collapsed' : 'right-side-collapsed');
                    break;
                case 'theme':
                    $scope.header.theme = !$scope.header.theme;
                    break;
                case 'history':
                    $scope.header.history = !$scope.header.history;
                    $scope.header.menu_style = $scope.header.history ? 'sidebar-collapsed' : 'sidebar-default';
                    break;
            }
        },

        collapse: function (c) {
            if (c === 'change') {
                $scope.header.menu_collapse = '';
            } else {
                //if ($scope.header.menu_style) {
                //    $scope.header.menu_style = '';
                //    $scope.header.menu_collapse = $scope.header.menu_collapse ? '' : 'sidebar-collapsed';
                //    $scope.collapse = !$scope.collapse;
                //} else {
                $scope.header.menu_collapse = $scope.header.menu_collapse ? '' : 'sidebar-collapsed';
                //}
            }

        }
    };

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.header.animation = 'fadeInUp';
        setTimeout(function () {
            $scope.header.animation = '';
        }, 100);

        $scope.header.boxed = '';
        $scope.header.footer = true;

        $rootScope.style = 'style1';
    });
}

