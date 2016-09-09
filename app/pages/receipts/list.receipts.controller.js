(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsListController', ReceiptsListController);

    ReceiptsListController.$inject = ['ReceiptService', 'NgTableParams', '$state'];

    function ReceiptsListController(ReceiptService,  NgTableParams, $state) {
        var vm = this;
        vm.titles = [];
        vm.ReceiptsList = [];
        vm.deleteReceipt = deleteReceipt;

        ReceiptService.getAllReceipts(function (response) {
            var i = 0;
            for (var key in response.data.data) {
                vm.ReceiptsList.push(response.data.data[key]);
                vm.ReceiptsList[i].id = key;
                var header = vm.ReceiptsList[i].name;
                vm.ReceiptsList[i].name = header.match(/<h2>(.*?)<\/h2>/i)[1];
                if (!vm.ReceiptsList[i].dailyCalories) {
                    vm.ReceiptsList[i].dailyCalories = [{value: 0}, {value: 0}, {value: 0}, {value: 0}];
                }

                vm.ReceiptsList[i].cal = vm.ReceiptsList[i].dailyCalories[0].value;
                if ( vm.ReceiptsList[i].dailyCalories.length > 1) {
                    vm.ReceiptsList[i].fat = vm.ReceiptsList[i].dailyCalories[1].value;
                }
                if ( vm.ReceiptsList[i].dailyCalories.length > 2) {
                    vm.ReceiptsList[i].carb = vm.ReceiptsList[i].dailyCalories[2].value;
                }
                if ( vm.ReceiptsList[i].dailyCalories.length > 3) {
                    vm.ReceiptsList[i].prot = vm.ReceiptsList[i].dailyCalories[3].value;
                }
                delete vm.ReceiptsList[i].dailyCalories;

               // console.log('vm.ReceiptsList[i].dailyCalories is: ', vm.ReceiptsList[i].dailyCalories);
                i++;
            }
            vm.tableParams = new NgTableParams({}, { dataset: vm.ReceiptsList});

        });

        function deleteReceipt(id) {
            for ( var i = 0; i < vm.ReceiptsList.length; i ++ ) {
                if ( vm.ReceiptsList[i].id == id ) {
                    vm.ReceiptsList.splice(i, 1);
                }
            }
            ReceiptService.receiptDelete(id, function(response) {
               // console.log('response is: ', response);
            });

            vm.tableParams = new NgTableParams({}, { dataset: vm.ReceiptsList});
        }




    }
})();
