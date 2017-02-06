(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$log'];

    function MainController($rootScope, $log) {
        $rootScope.showSideMenu = true;
        $rootScope.sideMenu = "";
        $rootScope.toggleSideMenu = toggleSideMenu;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //Changin classes for the tag "body" depends from different states            
            $rootScope.page = toState;
        });

        $rootScope.$on(
            '$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                if (!angular.isString(error)) {
                    error = JSON.stringify(error);
                }
                $log.error('$stateChangeError: ' + error);
            }
        );

        function toggleSideMenu() {
            if($rootScope.showSideMenu == true){
                $rootScope.showSideMenu = false
                $rootScope.sideMenu = "";
            }
            else {
                $rootScope.showSideMenu = true;
                $rootScope.sideMenu = "in";
            }
        }
    }
})();
