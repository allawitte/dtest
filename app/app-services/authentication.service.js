(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', 'API_ENDPOINT'];

    function AuthenticationService($http, $cookieStore, API_ENDPOINT) {
        var service = {};

        service.Login = Login;

        return service;

        function Login(user, callback) {
            $http.put(API_ENDPOINT + '/login', user)
                .then(function successCallback(response) {
                        console.log(response.data.data);
                        $cookieStore.put('userId', response.data.data.userId);
                        var answer = {success: true};
                        callback(answer);
                    },
                    function errorCallback(response, status) {
                        response = {success: false, message: 'LOGIN.LOGINERR'};
                        console.log(response);
                        callback(response);
                    });
        }

    }


})();
