(function () {
    'use strict';

    angular
        .module('app')
        .factory('CardsService', CardsService);

    CardsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function CardsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.actionUpload = actionUpload;
        service.getActionById = getActionById;
        service.getAllActions = getAllActions;
        service.updateAction = updateAction;
        service.deleteAction = deleteAction;

        return service;

        function deleteAction(id, callback) {
            $http.delete(API_ENDPOINT + "/cards/"+id)
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });
               
        }

        function updateAction(id, action, callback) {
            $http.put(API_ENDPOINT + "/cards/"+id, JSON.stringify(action))
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });
               
        }

        function getAllActions(options, callback) {
            $http.get(API_ENDPOINT + "/cards"+options)
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });
               

        }

        function actionUpload(action, callback) {
            $http.post(API_ENDPOINT + "/cards", JSON.stringify(action))
                .then(function(data){
                        callback(data.data);
                    }
                    ,function(err){
                        handleError(err.status);
                    });
               
        }

        function getActionById(id, callback) {
            $http.get(API_ENDPOINT + "/cards/" + id)
                .then(function(data){
                        callback(data.data);
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
})();
/**
 * Created by Alla on 8/14/2016.
 */
