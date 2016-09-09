(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService'];

    function LoginController($state, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.user = {};


        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.user, function (response) {
                if (response.success) {
                    $state.go('/home.dashboard', {eventId: "123"});
                    // $location.path('home.card-form');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function register() {
            $state.go('/register');
        }
    }

})();
