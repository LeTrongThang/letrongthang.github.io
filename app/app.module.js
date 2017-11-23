(function () {
    "use strict";

    angular.module('app', [
        'ui.router',
        'ngStorage',
        'ui.bootstrap',
        'ncy-angular-breadcrumb',
        'restangular',
        'app.themeDirectives',
        'app.services',
        'app.appDirectives',
        'app.filters',
        'app.components'
    ]);
})();