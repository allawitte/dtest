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

                    if (response.user.role == 'ADMIN') {
                        $state.go('/home.admin', {eventId: "123"});                    }
                    else {
                        console.log('login:',response.userId);
                        $state.go('/client.office', {"userId": response.userId});
                    }
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function register() {
            $state.go('/survey');
        }
    }

})();
