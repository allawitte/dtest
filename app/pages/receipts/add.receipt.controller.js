(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsAddController', ReceiptsAddController);

    ReceiptsAddController.$inject = ['ReceiptService', '$state', 'Functions'];

    function ReceiptsAddController( ReceiptService, $state, Functions) {

        var vm = this;
        vm.edit = true;
        vm.view = false;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.send = send;
        vm.cancel = cancel;
        vm.addImg = addImg;
        vm.saveImg = saveImg;
        vm.removeImg = removeImg;
        vm.addStep = addStep;
        vm.removeStep = removeStep;
        vm.autocompleteIngr = autocompleteIngr;
        vm.autocompleteInvent = autocompleteInvent;
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.ingredients = [''];
        vm.inventory = [];
        vm.subname = "";
        vm.imgLoaded = false;
        vm.noName = false;


        //************     form ng-model    **********************
        ReceiptService.getIventoryAutoComplete('', function (result) {
            vm.inventory = result.data;
        });

        vm.Receipt = {
            name: "",
            photo: "",
            shortDescription: "",
            timeCookMinutes: "",
            servesCoun: "",
            difficult: 'EASY',
            inventory: [''],
            ingredients: [{}],
            steps: [{photos: [{id: 0}]}]
        };



        vm.Receipt['dailyCalories']= Functions.getDailyCalories ();


        //************  initialisations   ****************

        vm.difficult = Functions.getLevel ();


        vm.units = Functions.getUnits ();


        vm.steps = [
            {stepNumber: 1, photos: [{id: 0}]}
        ];

        vm.Receipt.ingredients[0].unit = vm.units[0];
        //************  autocoplete  ************


        function autocompleteInvent(data) {
            return ReceiptService.getIventoryAutoComplete(data);
        }

        function autocompleteIngr(data) {
            return ReceiptService.getIngrAutoComplete(data);
        }

        function addIngredient() {
            var newItemNo = vm.Receipt.ingredients.length;
            vm.Receipt.ingredients.push({});
        }

        function addTool() {
            var newItemNo = vm.Receipt.inventory.length;
            vm.Receipt.inventory.push("");
        }

        function removeIngredient(index) {

            vm.Receipt.ingredients.splice(index, 1);
        }

        function removeTool(index) {
            vm.Receipt.inventory.splice(index, 1);
        }

        function send() {
            var photos = [];
            var title = '';
            var backReceipt = {};
            var value = 0;
            var name = "";
            var type = "";

            backReceipt.dailyCalories = [];
            backReceipt.ingredients = [];

            var i = 0;
            for (i = 0; i < vm.steps.length; i++) {
                for (var j = 0; j < vm.steps[i].photos.length; j++) {
                    if (vm.steps[i].photos[j].img) {
                        photos.push(vm.steps[i].photos[j].img);
                    }
                }
                vm.steps[i].photos = photos;
                photos = [];
            }
            title = '<h2>' + vm.Receipt.name + '</h2><span>' + vm.subname + '</span>';
            backReceipt.name = title || "";
            backReceipt.photo = vm.Receipt.photo || "";
            backReceipt.shortDescription = vm.Receipt.shortDescription || "";
            backReceipt.timeCookMinutes = vm.Receipt.timeCookMinutes || 0;
            backReceipt.servesCount = vm.Receipt.servesCount || 0;
            backReceipt.difficult = vm.Receipt.difficult;
            backReceipt.inventory = vm.Receipt.inventory || "";
            backReceipt.steps = vm.steps;

            backReceipt.dailyCalories = vm.Receipt.dailyCalories;
/*
            for (i = 0; i < vm.Receipt.dailyCalories.length; i++) {
                value = vm.Receipt.dailyCalories[i].value;
                type = vm.Receipt.dailyCalories[i].type;
                backReceipt.dailyCalories.push({"value": value, "type": type});
            }
*/
            for (i = 0; i < vm.Receipt.ingredients.length; i++) {
                name = vm.Receipt.ingredients[i].name;
                value = vm.Receipt.ingredients[i].value;
                var unit = vm.Receipt.ingredients[i].unit;
                backReceipt.ingredients.push({"name": name, "value": value, "unit": unit});
            }

            if (vm.Receipt.name) {

                ReceiptService.receiptUpload(backReceipt, function (response) {
                    $state.go('/receipts.list');
                });
            }
            else {
                vm.noName = true;
            }
        }


        function addStep() {
            var newStep = vm.steps.length + 1;
            vm.steps.push({"stepNumber": newStep, photos: [{id: 0}]});
        }

        function removeStep(index) {
            vm.steps.splice(index, 1);
        }

        function addImg(index) {
            var newImg = vm.steps[index].photos.length;
            vm.steps[index].photos.push({"id": newImg});
        }

        function removeImg(stepIndx, imgIndx) {
            if ( stepIndx !== undefined ) {
                vm.steps[stepIndx].photos.splice(imgIndx, 1);
            }
            else {
                vm.Receipt.photo = "";
            }
        }


        function saveImg(image, stepIndex, imagIndex) {

            ReceiptService.imgUpload(image, function (response) {
                if (response.data) {
                    if (stepIndex != undefined) {
                        vm.steps[stepIndex].photos[imagIndex].img = response.data;

                    } else {
                        vm.Receipt.photo = response.data;
                        vm.imgLoaded = true;
                    }
                }
            });

        }

        function cancel() {
            $state.go('/receipts.list');
        }

    }

})();
