(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientShoppingController', ClientShoppingController);

    ClientShoppingController.$inject = ['$scope', '$state', 'PlanDaysData'];

    function ClientShoppingController($scope, $state, PlanDaysData) {
        var vm = this;
        vm.userId = $state.params.userId;
        vm.back = back;
        $scope.datePicker = {};
        $scope.datePicker.date = {startDate: null, endDate: null};
        $scope.$watch('isPlanArrLoaded', function(){
            if($scope.isPlanArrLoaded){
                vm.range = PlanDaysData.getAvailableDates();
            }
        });

        $scope.$watch('datePicker.date', function(){
            if($scope.datePicker.date.endDate && $scope.datePicker.date.startDate){
                vm.list = PlanDaysData.getIngredients(moment($scope.datePicker.date.startDate).format('YYYYMMDD'),moment($scope.datePicker.date.endDate).format('YYYYMMDD'));

            }
        });






        function back(){

        }

    }
})();
/**
 * Created by HP on 12/4/2016.
 */
