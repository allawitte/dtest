(function () {
    'use strict';

    angular
        .module('app')
        .controller('viewMembersController', viewMembersController);

    viewMembersController.$inject = ['UserService', 'NgTableParams', '$state'];

    function viewMembersController(UserService, NgTableParams, $state) {
        var vm = this;
        vm.user = {};
        UserService.GetById($state.params.userId)
            .then(function(data) {
                vm.user = data.data.data;
            });
        console.log($state.params.userId);
    }
})();/**
 * Created by Alla on 8/12/2016.
 */
