(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsEditController', ReceiptsEditController);

    ReceiptsEditController.$inject = ['ReceiptService', '$stateParams', '$state'];

    function ReceiptsEditController(ReceiptService, $stateParams, $state) {
        var vm = this;

        vm.steps = [{photos: []}];
        vm.send = send;
        vm.cancel = cancel;
        vm.removePrevImg = removePrevImg;
        vm.addImg = addImg;
        vm.saveImg = saveImg;
        vm.removeImg = removeImg;
        vm.addStep = addStep;
        vm.removeStep = removeStep;
        vm.autocompleteIngr = autocompleteIngr;
        vm.deleteReceipt = deleteReceipt;
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.Receipt = {};
        vm.noName = false;
        vm.id = $stateParams.receiptID;

        ReceiptService.getIventoryAutoComplete('', function (result) {
            vm.inventory = result.data;
        });



        vm.units = [
            'COUNT',
            'TABLESPOON',
            'GRAM',
            'TEASPOON',
            'LITER',
            'KG',
            'GLASS',
            'BEAM',
            'PINCH',
            'CLOVE',
            'TASTE'
        ];



        ReceiptService.getReceiptById($stateParams.receiptID, function (response) {
            vm.Receipt = response.data;
            if (vm.Receipt.name) {
                var header = vm.Receipt.name;
                vm.Receipt.name = header.match(/<h2>(.*?)<\/h2>/i)[1];
                vm.subname = header.match(/<span>(.*?)<\/span>/i)[1];
            }
            var difficultVal = vm.Receipt.difficult;
            vm.Receipt.difficult = {};
            vm.Receipt.difficult.val = difficultVal;
            vm.isMainPhoto = !vm.Receipt.photo;
            if (!vm.Receipt.dailyCalories) {
                vm.Receipt.dailyCalories = [
                    {type: 'CALORIE', value: '', dayPercentageCount: 0},
                    {type: 'FAT', value: '', dayPercentageCount: 0},
                    {type: 'CARBOHYDRATE', value: '', dayPercentageCount: 0},
                    {type: 'PROTEIN', value: '', dayPercentageCount: 0}
                ];
            }

            if (Array.isArray(vm.Receipt.steps)) {
                for (var i = 0; i < vm.Receipt.steps.length; i++) {
                    vm.steps.push({photos: [{}]});
                }


        }

    }

    );
        function deleteReceipt() {
            ReceiptService.receiptDelete($stateParams.receiptID, function(response) {
                $state.go('/receipts.list');
            });
        }

    function removePrevImg(stepIndex, photoIndex) {

        if (stepIndex === undefined) {
            vm.Receipt.photo = '';
            vm.isMainPhoto = false;
        }
        else {
            console.log("vm.Receipt.steps[stepIndex].photos ", vm.Receipt.steps[stepIndex].photos);
            vm.Receipt.steps[stepIndex].photos.splice(photoIndex, 1);
        }
    }

    function autocompleteInvent(data) {
        ReceiptService.getIventoryAutoComplete(data, function (result) {
            vm.inventory = result.data;
        });
    }

    function autocompleteIngr(data) {
        return ReceiptService.getIngrAutoComplete(data);
    }

    function addIngredient() {
        vm.Receipt.ingredients.push({});
    }

    function addTool() {
        vm.Receipt.inventory.push("");
    }

    function removeIngredient(index) {

        vm.Receipt.ingredients.splice(index, 1);
    }

    function removeTool(index) {
        vm.Receipt.inventory.splice(index, 1);
    }

    function addImg(index) {
        console.log('step ind', index, vm.steps[index]);
        var newImg = vm.steps[index].photos.length || 0;
        vm.steps[index].photos.push({"id": newImg});
    }

    function addStep() {
        var newStep = vm.Receipt.steps.length + 1;
        vm.Receipt.steps.push({"stepNumber": newStep, photos: ['']});
        vm.steps.push({photos: [{}]});
        console.log('steps', vm.steps);
    }

    function removeStep(index) {
        vm.Receipt.steps.splice(index, 1);
    }

    function removeImg(stepIndx, imgIndx) {
        if (stepIndx !== undefined) {
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

    function send() {
        var photos = [];
        var title = '';
        var backReceipt = {};
        var value = 0;
        var name = "";
        var type = "";
        var dayPercentageCount = 0;

        backReceipt.dailyCalories = [];
        backReceipt.ingredients = [];
        backReceipt.steps = vm.Receipt.steps;
        console.log('vm.Receipt.steps ', vm.Receipt.steps);
        var i = 0;
        console.log('vm.steps = ', vm.steps);
        for (i = 0; i < vm.steps.length - 1; i++) {
            for (var j = 0; j < vm.steps[i].photos.length; j++) {
                if (vm.steps[i].photos[j].img) {
                    photos.push(vm.steps[i].photos[j].img);
                }
            }
            vm.steps[i].photos = photos;
            photos = [];
            console.log('i=', i);
            backReceipt.steps[i].photos =
                backReceipt.steps[i].photos
                .concat(vm.steps[i].photos);
            console.log('vm.steps[i].photos is: ', vm.steps[i].photos);
            console.log('backReceipt.steps[i].photos is: ', backReceipt.steps[i].photos);
        }


        title = '<h2>' + vm.Receipt.name + '</h2><span>' + vm.subname + '</span>';
        backReceipt.name = title || "";
        backReceipt.photo = vm.Receipt.photo || "";
        backReceipt.shortDescription = vm.Receipt.shortDescription || "";
        backReceipt.timeCookMinutes = vm.Receipt.timeCookMinutes || 0;
        backReceipt.servesCount = vm.Receipt.servesCount || 0;
        backReceipt.difficult = vm.Receipt.difficult.val;
        backReceipt.inventory = vm.Receipt.inventory || "";

        for (i = 0; i < vm.Receipt.dailyCalories.length; i++) {
            value = vm.Receipt.dailyCalories[i].value;
            type = vm.Receipt.dailyCalories[i].type;
            dayPercentageCount = vm.Receipt.dailyCalories[i].dayPercentageCount || 0;

            backReceipt.dailyCalories.push({"value": value, "type": type, "dayPercentageCount": dayPercentageCount});
        }

        for (i = 0; i < vm.Receipt.ingredients.length; i++) {
            name = vm.Receipt.ingredients[i].name;
            value = vm.Receipt.ingredients[i].value;
            var unit = vm.Receipt.ingredients[i].unit.val;
            backReceipt.ingredients.push({"name": name, "value": value, "unit": unit});
        }
        console.log("backReceipt is: ", backReceipt);
        if (vm.Receipt.name) {
            ReceiptService.receiptUpdate($stateParams.receiptID, backReceipt, function (response) {
                $state.go('/receipts.list');
            });
        }
        else {
            vm.noName = true;
        }
    }

    function cancel() {
        $state.go('/receipts.list');
    }
}

})
();
