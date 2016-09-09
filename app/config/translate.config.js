(function () {
    'use strict';
    angular
        .module('transl', ['pascalprecht.translate'])
        .config(config);
    config.$inject = [ '$translateProvider' ];
    function config($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/l10n/',
            suffix: '.json'
        });

        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('ru');
        $translateProvider.useSanitizeValueStrategy('escape');
    }
})();