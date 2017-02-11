(function () {
    'use strict';

    angular
        .module('app')
        .factory('UtilsService', UtilsService);

    UtilsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function UtilsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.imgUpload = imgUpload;

        return service;

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
    }
})();
/**
 * Created by Alla on 8/14/2016.
 */