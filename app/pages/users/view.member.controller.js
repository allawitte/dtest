(function () {
    'use strict';

    angular
        .module('app')
        .controller('viewMembersController', viewMembersController);

    viewMembersController.$inject = ['UserService', 'NgTableParams', '$state', 'ProgramsService'];

    function viewMembersController(UserService, NgTableParams, $state, ProgramsService) {
        var vm = this;
        vm.user = {};
        vm.deleteDay = deleteDay;
        UserService.GetById($state.params.userId)
            .then(function(data) {
                vm.user = data.data.data;
            });
        console.log($state.params.userId);
        function listPrograms(){
            vm.program = [];
            ProgramsService.getProgram($state.params.userId, function (response) {
                for ( var key in response.data) {
                    response.data[key]['dayId'] = key;
                    vm.program.push(response.data[key]);
                };
                vm.tableParams = new NgTableParams({}, { dataset: vm.program});
            });
        }

        listPrograms();

        function deleteDay(dayId){
            ProgramsService.deleteProgram(dayId, function(response){
                listPrograms();
            });
            //console.log('dayId', dayId);
        }
    }
})();/**
 * Created by Alla on 8/12/2016.
 */
