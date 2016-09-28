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
                console.log(response);
                if (response.success) {

                    if (response.user.isFirstOpinionComplete) {
                        $state.go('/home.dashboard', {eventId: "123"});
                    }
                    else $state.go('/client.survey');
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
