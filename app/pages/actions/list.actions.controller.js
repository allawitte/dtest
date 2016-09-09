(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListActionController', ListActionController);

    ListActionController.$inject = ['NgTableParams', 'CardsService', '$state', '$scope'];

    function ListActionController(NgTableParams, CardsService, $state, $scope) {
        var vm = this;
        vm.ActionsList = [];
        var option = "?size=100&from=0";
        vm.deleteAction = deleteAction;


        CardsService.getAllActions(option, function(response) {
            var i = 0;

            for ( var key in response.data.data) {
                vm.ActionsList.push(response.data.data[key]);
                vm.ActionsList[i].id = key;
                i ++;
            }
            vm.tableParams = new NgTableParams({}, { dataset: vm.ActionsList});
        });


        function deleteAction(id) {
            for ( var i = 0; i < vm.ActionsList.length; i ++ ) {
                if ( vm.ActionsList[i].id == id ) {
                    vm.ActionsList.splice(i, 1);
                }
            }
            CardsService.deleteAction(id, function(response){
            });
            vm.tableParams = new NgTableParams({}, { dataset: vm.ActionsList});
        }
        /**
         * Created by Alla on 8/14/2016.
         */
    }
})();