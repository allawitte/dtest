(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsViewController', ReceiptsViewController);

    ReceiptsViewController.$inject = ['$scope', 'ReceiptService', '$sce', '$stateParams'];

    function ReceiptsViewController($scope, ReceiptService, $sce, $stateParams) {
        var vm = this;
        vm.Receipt = {};
        vm.header = "";

        vm.id = $stateParams.receiptID;
        ReceiptService.getReceiptById(vm.id, function(response) {
			vm.Receipt = response.data;
			vm.header = $sce.trustAsHtml(vm.Receipt.name);
        });
        
        

    }
})();
