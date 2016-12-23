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
            'ngRoute'
        ])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$state', '$timeout'];

    function run($rootScope, $cookieStore, $state, $timeout) {
        // keep user logged in after page refresh
        $rootScope.header = false;
        $timeout(function() {
            $rootScope.currentUser = $cookieStore.get('userId') || {};
           // console.log($state.current.url);
           // console.log($rootScope.currentUser);
            var restrictedPage = $.inArray($state.current.url, ['/login', '/register']) === -1;
            var loggedIn = (typeof  $rootScope.currentUser === 'string');   
            if (restrictedPage && !loggedIn) {

                $state.go('/login');
            }
        });
}

})();
