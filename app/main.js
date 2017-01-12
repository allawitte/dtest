(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ui.router',
            'ngCookies',
            'transl',
            'ngIntlTelInput',
            'api.config',
            'jmApp',
            'ui.bootstrap',
            "ngTouch",
            'ui.select',
            'imageupload',
            'ngTable',
            'angularUtils.directives.dirPagination',
            'sbDateSelect',
            'ngOnlyNumberApp',
            'LocalStorageModule',
            'ngRoute',
            'daterangepicker'
        ])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$state', '$timeout', '$location', 'Functions'];

    function run($rootScope, $cookieStore, $state, $timeout, $location, Functions) {

        // keep user logged in after page refresh
        $rootScope.header = false;
        $timeout(function() {
            $rootScope.currentUser = $cookieStore.get('userId') || {};
            var restrictedPage = $.inArray($state.current.url, ['/login', '/register']) === -1;
            var loggedIn = (typeof  $rootScope.currentUser === 'string');   
            if (restrictedPage && !loggedIn) {

                $state.go('/login');
            }
        });
/*
        $rootScope.$on('$locationChangeSuccess',function(evt, absNewUrl, absOldUrl) {
            console.log('success', evt, absNewUrl, absOldUrl);
        }); */
}

})();
