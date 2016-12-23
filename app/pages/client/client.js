(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$scope', '$state', 'ProgramsService'];

    function ClientController($scope, $state, ProgramsService) {
        var pvm = this;
        var userId = $state.params.userId;
        ProgramsService.getProgram(userId, function(response){
            pvm.plans = response.data;
        });
    }
})();
/**
 * Created by HP on 9/28/2016.
 */
