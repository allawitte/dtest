(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'API_ENDPOINT'];
    function UserService($http, API_ENDPOINT) {
        var service = {};

        service.GetAll = GetAll;
        service.GetMe = GetMe;
        service.GetById = GetById;
        service.Create = Create;
        service.Logout = Logout;
        service.DeleteUser = DeleteUser;

        return service;

        function GetAll(params) {
            return $http.get(API_ENDPOINT + '/users'+ params).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetMe() {
            return $http.get(API_ENDPOINT + '/users/me').then(handleSuccess, handleError);

        }

        function GetById(userId) {
            return $http.get(API_ENDPOINT + '/users/' + userId).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post(API_ENDPOINT + '/register/', JSON.stringify(user)).then(handleSuccess, handleError);
        }

        function Logout() {
            return $http.delete(API_ENDPOINT + '/logout/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function DeleteUser(user){

        }

        // private functions

        function handleSuccess(res) {
            res.success = true;
            return res;
        }

        function handleError(res) {
            var msg;
            switch(res.status) {
                case 452:
                    msg = 'USERS.EXISTUSER';
                    break;
                case 406:
                    msg = 'USERS.NOTACCEPTABLE';
                    break;
                default:
                    msg = 'USERS.REGISTERERR';
            }
            return {success: false, message: msg};
        }
    }

})();
