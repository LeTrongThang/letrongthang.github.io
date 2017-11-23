angular.module('app.translate',[])
    .config(TranslateConfig);

function TranslateConfig($translateProvider) {
    //translate
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/shared/trans/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    // $translateProvider.fallbackLanguage('vi');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
}