(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientShoppingController', ClientShoppingController);

    ClientShoppingController.$inject = ['$scope', '$state', 'localStorageService', '$rootScope'];

    function ClientShoppingController($scope, $state, localStorageService, $rootScope) {
        var vm = this;
        vm.userId = $state.params.userId;
        vm.back = back;
        var sList = {
            list: [],
            objList: []
        };
        var list = localStorageService.get('ingrArr');
        console.log(list);
        list.forEach(function(item){
            var is = false;
            sList.list.forEach(function(itm, index){
                if ( item.name == itm) {
                    is = true;
                }
            });
            if(!is){
                sList.list.push(item.name);
                sList.objList.push(item);
            }
            else {
                sList.objList[index].value += item.value;
            }
        });
        vm.list = sList.objList;
        $scope.setUpdate(true);
        function back(){
            $rootScope.mainPart = true;
            localStorageService.remove('shopping');
        }

    }
})();
/**
 * Created by HP on 12/4/2016.
 */
