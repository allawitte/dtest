(function () {
    'use strict';

    angular
        .module('app')
        .controller('MembersListController', MembersListController);

    MembersListController.$inject = ['UserService', 'NgTableParams', '$state'];

    function MembersListController(UserService, NgTableParams, $state) {
        var vm = this;
        var params = '?size=100&from=0';
        vm.users = [];
        vm.viewMember = viewMember;
        UserService.GetAll(params)
            .then(function(response){
                console.log(response);
                var i = 0;
                for ( var key in response.data.data.data) {
                    vm.users.push(response.data.data.data[key]);
                    vm.users[i].id = key;
                    i++;
                }
                vm.tableParams = new NgTableParams({}, { dataset: vm.users});
            });

        function viewMember(userId) {

            $state.go('/members.view', {"userId" : userId});
        }
    }
})();/**
 * Created by Alla on 8/10/2016.
 */
