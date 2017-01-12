(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientOfficeController', ClientOfficeController);

    ClientOfficeController.$inject = ['$state', '$rootScope', '$scope', '$location', 'Functions', 'PlanDaysData'];
    /* ngInject */
    function ClientOfficeController($state, $rootScope, $scope, $location, Functions, PlanDaysData) {
        var vm = this;

        vm.back = back;
        vm.forward = forward;
        vm.showPage = showPage;
        vm.isToday = isToday;
        vm.isFirstDate = isFirstDate;
        vm.isLastDate = isLastDate;
        vm.dayPlan = {};
        vm.getFirstDay = getFirstDay;
        vm.getToday = getToday;
        vm.getLastDay = getLastDay;



        if(PlanDaysData.getCurrentDay() != undefined){
            vm.dayPlan = PlanDaysData.getDay(PlanDaysData.getCurrentDay());

        }

        $scope.$watch('isPlanArrLoaded', function(){
            if($scope.isPlanArrLoaded && PlanDaysData.getCurrentDay() === undefined) {
                vm.dayPlan = PlanDaysData.getTodayPlan();
                if(!vm.dayPlan){
                    vm.dayPlan = PlanDaysData.getFirstDay();
                }
            }
        });

        function getLastDay(){
            vm.dayPlan = PlanDaysData.getLastDay();
        }

        function getToday(){
            vm.dayPlan = PlanDaysData.getTodayPlan();
        }

        function getFirstDay(){
            vm.dayPlan = PlanDaysData.getFirstDay();
        }

        function isLastDate(){
            if('plan' in vm.dayPlan){
                return (vm.dayPlan.plan.planDate == PlanDaysData.getLastDate());
            }
        }

        function isFirstDate(){
            if('plan' in vm.dayPlan){
                console.log('Is First vm.dayPlan.plan.planDate', vm.dayPlan.plan.planDate);
                return (vm.dayPlan.plan.planDate == PlanDaysData.getFirstDate());
            }
        }

        function isToday(){
            if('plan' in vm.dayPlan){
                return (vm.dayPlan.plan.planDate == PlanDaysData.getToday());
            }
        }

        function showPage(object){
            PlanDaysData.setFullPageData(object);
            PlanDaysData.setCurrentDay(vm.dayPlan.dayNumber);
            if('cardType' in object){
                $state.go('card');
            }
            else {
                $state.go('receipt');
            }

        }

        function forward(){
            vm.dayPlan = PlanDaysData.getDay(vm.dayPlan.dayNumber + 1);

        }

        function back(){
            vm.dayPlan = PlanDaysData.getDay(vm.dayPlan.dayNumber - 1);

        }

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });



    }
})();
/**
 * Created by HP on 10/2/2016.
 */
