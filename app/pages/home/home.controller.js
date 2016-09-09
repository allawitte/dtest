(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', '$cookieStore'];

    function HomeController($state, $cookieStore) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            $cookieStore.remove('userId');
            $state.go('/login');
        }


    }
})();
