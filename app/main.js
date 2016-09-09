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
            'angularUtils.directives.dirPagination'
        ])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$http', '$state', '$timeout'];

    function run($rootScope, $cookieStore, $http, $state, $timeout) {
        // keep user logged in after page refresh

        $timeout(function() {
            $rootScope.currentUser = $cookieStore.get('userId') || {};
            var restrictedPage = $.inArray($state.current.url, ['/login', '/register']) === -1;
            var loggedIn = (typeof  $rootScope.currentUser === 'string');   
            if (restrictedPage && !loggedIn) {

                $state.go('/login');
            }
        });
}

})();