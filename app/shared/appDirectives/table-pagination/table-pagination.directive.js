angular.module('app.appDirectives')
    .directive('tablePagination', ['$translate', function ($translate) {
        return {
            restrict: 'AE',
            templateUrl: 'app/shared/appDirectives/table-pagination/table-pagination.tpl.html'
        }
    }]);