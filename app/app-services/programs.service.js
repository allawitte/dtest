(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProgramsService', ProgramsService);

    ProgramsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function ProgramsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.uploadProgram = uploadProgram;


        return service;

        function uploadProgram(program, callback) {
            $http.post(API_ENDPOINT + "/plandays", JSON.stringify(program))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function handleError(error) {
            console.log(error);
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();/**
 * Created by Alla on 8/29/2016.
 */
