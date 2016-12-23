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
        var difficult = {'EASY': 'LEVELS.EASY', 'MEDIUM': 'LEVELS.MEDIUM', 'HARD': 'LEVELS.HARD'};
        vm.titles = [ 'HEADERS.CAL', 'HEADERS.CARB', 'HEADERS.PROTEIN', 'HEADERS.FAT'];
        
        vm.units = {'COUNT': 'UNITS.UNITS', 'TABLESPOON': 'UNITS.TABLESP', 'GRAM': 'UNITS.GR', 'TEASPOON': 'UNITS.TEASP', 'LITER': 'UNITS.LITER', 'KG': 'UNITS.KG', 'GLASS': 'UNITS.GLASS'};

        vm.id = $stateParams.receiptID;
        ReceiptService.getReceiptById(vm.id, function(response) {
			vm.Receipt = response.data;
			vm.header = $sce.trustAsHtml(vm.Receipt.name);
			vm.difficult = difficult[vm.Receipt.difficult];
        });
        
        

    }
})();
