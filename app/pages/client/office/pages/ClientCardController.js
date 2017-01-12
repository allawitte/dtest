(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientCardController', ClientCardController);

    ClientCardController.$inject = ['$scope', '$state', 'localStorageService', '$rootScope', 'PlanDaysData'];

    function ClientCardController($scope, $state, localStorageService, $rootScope, PlanDaysData) {
        var vm = this;

        vm.Action = PlanDaysData.getFullPageData();

        console.log('vm.Action', vm.Action);

    }
})();

/**
 * Created by HP on 12/2/2016.
 */
