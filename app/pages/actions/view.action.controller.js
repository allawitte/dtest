(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewActionController', ViewActionController );

    ViewActionController .$inject = ['CardsService', '$state', '$scope', '$sce'];

    function ViewActionController (CardsService, $state, $scope, $sce) {
        var vm = this;
        vm.Action = {};
        vm.deleteAction = deleteAction;
        vm.trustSrc = trustSrc;
        vm.edit = $state.params.actionID;

        CardsService.getActionById($state.params.actionID, function(response){
            vm.Action = response.data;
            console.log('response is: ', response);
        });

        function deleteAction() {
            CardsService.deleteAction(id, function(response){
                console.log(response);
                $state.go('/actions.list');
            });
        }
        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }
        /**
         * Created by Alla on 8/14/2016.
         */
    }
})();
