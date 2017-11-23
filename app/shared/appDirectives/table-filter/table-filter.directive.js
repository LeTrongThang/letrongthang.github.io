angular.module('app.appDirectives')
    .directive('tableFilter', ['$translate', function ($translate) {
        return {
            restrict: 'AE',
            templateUrl: 'app/shared/appDirectives/table-filter/table-filter.tpl.html'
        }
    }]);