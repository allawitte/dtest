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
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function updateAction(id, action, callback) {
            $http.put(API_ENDPOINT + "/cards/"+id, JSON.stringify(action))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getAllActions(options, callback) {
            $http.get(API_ENDPOINT + "/cards"+options)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });

        }

        function actionUpload(action, callback) {
            $http.post(API_ENDPOINT + "/cards", JSON.stringify(action))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getActionById(id, callback) {
            $http.get(API_ENDPOINT + "/cards/" + id)
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
})();
/**
 * Created by Alla on 8/14/2016.
 */
