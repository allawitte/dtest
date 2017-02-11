(function () {
    'use strict';

    angular
        .module('app')
        .factory('OpinionService', OpinionService);

    OpinionService.$inject = ['$http', 'API_ENDPOINT'];
    function OpinionService($http, API_ENDPOINT) {
        var service = {};

        service.createUpdateFirstOpinion = createUpdateFirstOpinion;

        return service;

        function createUpdateFirstOpinion(data, callback) {
            $http.post( API_ENDPOINT + '/opinions/firstOpinion', JSON.stringify(data))
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });


        }
        function handleError(error) {
            if (error == 403) {
                $state.go('/login');
            }
        }

    };
})();/**
 * Created by Alla on 8/9/2016.
 */
