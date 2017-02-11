(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProgramsService', ProgramsService);

    ProgramsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function ProgramsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.uploadProgram = uploadProgram;
        service.deleteProgram = deleteProgram;
        service.getProgram = getProgram;


        return service;

        function deleteProgram(planDayId, callback){
            $http.delete(API_ENDPOINT+ "/plandays/"+planDayId)
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });

        }

        function getProgram(userId, callback) {
            $http.get(API_ENDPOINT+ "/plandays?memberId="+userId+"&dayFrom=2016-10-01&dayTo=2018-12-30")
                .then(function(data){
                        callback(data.data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });

        }

        function uploadProgram(program, callback) {
            $http.post(API_ENDPOINT + "/plandays", JSON.stringify(program))
                .then(function(data){
                        callback(data.status);
                    }
                    ,function(err){
                        handleError(err.status);
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
