angular.module('app.appDirectives')
    .directive('tableSearch', ['$translate', function ($translate) {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/appDirectives/table-search/table-search.tpl.html'
        }
    }]);