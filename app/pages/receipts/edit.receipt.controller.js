(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsEditController', ReceiptsEditController);

    ReceiptsEditController.$inject = ['ReceiptService', '$stateParams', '$state', 'Functions', '$scope', 'PlanDayTransfer'];

    function ReceiptsEditController(ReceiptService, $stateParams, $state, Functions, $scope, PlanDayTransfer) {
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
        vm.autocompleteInvent = autocompleteInvent;
        vm.deleteReceipt = deleteReceipt;
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.Receipt = {};
        vm.noName = false;
        vm.id = $stateParams.receiptID;
        var isLastUrlPlanDay = false;
        var goToState = {};

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log('success', toState, toParams, fromState, fromParams);
            if (fromState.name.indexOf('planday.add') >= 0) {
                isLastUrlPlanDay = true;
                goToState.path = fromState.name;
                goToState.params = fromParams;
            }
        });

        function autocompleteInvent(data) {
            return ReceiptService.getIventoryAutoComplete(data);
        }

        $scope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl) {
            console.log('success', evt, absNewUrl, absOldUrl);
        });

        vm.units = Functions.getUnits();

        vm.difficult = Functions.getLevel();

        ReceiptService.getReceiptById($stateParams.receiptID, function(response) {
                vm.Receipt = response.data;

                if (vm.Receipt.name) {
                    vm.Receipt.name = Functions.getReceiptName(vm.Receipt.name);
                    vm.subname = Functions.getReceiptSubName(vm.Receipt.name);
                }

                vm.isMainPhoto = ! ! vm.Receipt.photo;
                if (! vm.Receipt.dailyCalories) {
                    vm.Receipt['dailyCalories'] = Functions.getDailyCalories();
                }

                if (Array.isArray(vm.Receipt.steps)) {
                    for (var i = 0; i < vm.Receipt.steps.length; i ++) {
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

            ReceiptService.imgUpload(image, function(response) {
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

            vm.Receipt.name = Functions.makeTitle(vm.Receipt.name, vm.subname);

            console.log("vm.Receipt is: ", vm.Receipt);
            if (vm.Receipt.name) {
                if(isLastUrlPlanDay){
                    PlanDayTransfer.updateAction($stateParams.receiptID, vm.Receipt);
                    $state.go(goToState.path, goToState.params);
                }
                else{
                    ReceiptService.receiptUpdate($stateParams.receiptID, vm.Receipt, function(response) {
                        $state.go('/receipts.list');
                    });
                }
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
