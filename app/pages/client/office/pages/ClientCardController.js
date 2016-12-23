(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientCardController', ClientCardController);

    ClientCardController.$inject = ['$scope', '$state', 'localStorageService', '$rootScope'];

    function ClientCardController($scope, $state, localStorageService, $rootScope) {
        var vm = this;
        $rootScope.mainPart = true;
        vm.userId = $state.params.userId;
        vm.back = back;
        vm.Action = localStorageService.get('oneDay');
        $scope.setUpdate(false);
        function back(){
            console.log('rootScope', $rootScope);
            $scope.setUpdate(false);
            localStorageService.remove('oneDay');
        }

    }
})();

/**
 * Created by HP on 12/2/2016.
 */
