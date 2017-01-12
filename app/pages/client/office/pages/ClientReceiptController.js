(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientReceiptController', ClientReceiptController);

    ClientReceiptController.$inject = ['$scope', '$state', '$sce', 'PlanDaysData'];

    function ClientReceiptController($scope, $state, $sce, PlanDaysData) {
        var vm = this;

        vm.stepPhotos = [];
        vm.increaseServ = increaseServ;
        vm.decreaseServ = decreaseServ;
        vm.receipt = PlanDaysData.getFullPageData();
        console.log('vm.receipt', vm.receipt);
        if('servesCount' in vm.receipt) {
            if(!vm.receipt.servesCount){
                vm.receipt.servesCount = 1;
            }
        }
        else{
            vm.receipt['servesCount'] = 1;
        }

        vm.inventory = vm.receipt.inventory.join(' / ');
        vm.stepsAmount = vm.receipt.steps.length;
        var ingredients = [];
        vm.header = $sce.trustAsHtml(vm.receipt.name);

        vm.receipt.ingredients.forEach(function(item){
            ingredients.push(item.value/vm.receipt.servesCount);
        });

        vm.receipt.steps.forEach(function (item) {
            vm.stepPhotos.push(item.photos.length);
        });

        function changeIngredientsAmount(){
            vm.receipt.ingredients.forEach(function(item, index) {

                item.value = ingredients[index] * vm.receipt.servesCount;
            });
        }

        function increaseServ() {
            vm.receipt.servesCount ++;
            changeIngredientsAmount();
        }

        function decreaseServ(){
            if(vm.receipt.servesCount > 1) {
                vm.receipt.servesCount --;
            }
            changeIngredientsAmount();
        }

        vm.userId = $state.params.userId;

    }
})();


/**
 * Created by HP on 12/2/2016.
 */
