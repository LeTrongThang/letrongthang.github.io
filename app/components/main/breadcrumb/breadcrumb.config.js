angular.module('app.components.main.breadcrumb')
.config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            templateUrl: 'app/components/main/breadcrumb/breadcrumb.tpl.html'
        })
    });