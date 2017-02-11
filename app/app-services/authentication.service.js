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
                    $cookieStore.put('userId', response.data.data.userId);
                    var answer = response.data.data;
                    answer.success = true;
                    callback(answer);
                },
                function errorCallback(response, status) {
                    response = {success: false, message: 'LOGIN.LOGINERR'};
                    callback(response);
                });
        }

    }


})();
