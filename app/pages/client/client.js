(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$scope'];

    function ClientController($scope) {
        var vm = this;
    }
})();
/**
 * Created by HP on 9/28/2016.
 */
