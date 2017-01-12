(function () {
    'use strict';

    angular
        .module('app')
        .factory('ReceiptService', ReceiptService);

    ReceiptService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function ReceiptService($http, API_ENDPOINT, $state) {
        var service = {};
        var receiptsList = {};

        service.imgUpload = imgUpload;
        service.receiptUpload = receiptUpload;
        service.receiptDelete = receiptDelete;
        service.getAllReceipts = getAllReceipts;
        service.getReceiptFromList = getReceiptFromList;
        service.getReceiptById = getReceiptById;
        service.receiptUpdate = receiptUpdate;
        service.getIngrAutoComplete = getIngrAutoComplete;
        service.getIventoryAutoComplete = getIventoryAutoComplete;

        return service;

        function receiptDelete(id, callback) {
            $http.delete(API_ENDPOINT + "/recipes/" + id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });

        }
        function receiptUpdate(id, receipt, callback) {
            $http.put(API_ENDPOINT + "/recipes/" + id, JSON.stringify(receipt))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }
        function getIventoryAutoComplete(data) {
            if(data === undefined) return;
            return $http.get(API_ENDPOINT + "/recipes/inventoryAutocomplete?word=" + data)
                .then(function (data, status, headers, config) {
                    //console.log('data', data.data.data);
                    return(data.data.data);
                });

        }

        function getIngrAutoComplete(data) {
            if(data === undefined)return;
           return $http.get(API_ENDPOINT + "/recipes/ingredientAutocomplete?word=" + data)
                .then(function (data, status, headers, config) {
                   //console.log(data.data.data);
                    return(data.data.data);
                });
        }

        function getReceiptById(id, callback) {
            $http.get(API_ENDPOINT + "/recipes/" + id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getReceiptFromList(id) {
            return receiptsList[id];
        }

        function getAllReceipts(callback) {
            $http.get(API_ENDPOINT + "/recipes?size=100&from=0")
                .success(function (data, status, headers, config) {
                    receiptsList = data.data.data;
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function receiptUpload(receipt, callback) {
            $http.post(API_ENDPOINT + "/recipes", JSON.stringify(receipt))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function imgUpload(image, callback) {
            $http({
                method: 'POST',
                url: API_ENDPOINT + "/utils/uploadImage",
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("image", image.file);
                    return formData;
                }
            })
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function handleError(error) {
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();
