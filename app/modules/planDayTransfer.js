(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlanDayTransfer', PlanDayTransfer);

    PlanDayTransfer.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function PlanDayTransfer($http, API_ENDPOINT, $state) {
        var service = {};
        service.modyfyFromServer = modyfyFromServer;
        service.modyfyToServer = modyfyToServer;
        service.modyfyCardsDataForLine = modyfyCardsDataForLine;
        service.modyfyCardsDataForPopUp = modyfyCardsDataForPopUp;

        return service;

        function modyfyFromServer() {

        }

        function modyfyCardsDataForLine(data) {
            var arr = [];
            for (var key in data) {
                // var name = (respond.data.data[key].name.indexOf('<h2>') > -1) ? respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1] : respond.data.data[key].name;
                arr.push({
                    id: key,
                    name: modyfyName(data[key].name),
                    type: 'RECEIPT'
                });
            }
            return arr;
        }

        function modyfyToServer(model, receiptsArr, actionsArr) {
            var PlanDayCreate = {};
            PlanDayCreate.planBuckets = [];
            model.plan.forEach(function (timeLine, timeIndex) {
                console.log('timeLine.actions.length', timeLine.actions.length);
                PlanDayCreate.planBuckets.push({'bucketTimestamp': Date.parse(timeLine.time)});

                timeLine.actions.forEach(function (actionsArr, actionIndex) {
                    console.log('continue');
                    if (actionsArr.type == 'RECEIPT') {
                        console.log('isObjAndHasNoField(PlanDayCreate.planBuckets[' + timeIndex + ']recipes', isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'recipes'));
                        //receipts do not eist yet and have to be created
                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'recipes')) {
                            PlanDayCreate.planBuckets[timeIndex].recipes = [];
                        }
                        var objInd = actionsArr.id;
                        PlanDayCreate.planBuckets[timeIndex].recipes.push(receiptsArr[objInd]);
                    }
                    else if (actionsArr.type == 'ACTION' || actionsArr.type == 'RECOMMENDATION') {
                        //cards array do not exist yet and have to be created
                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'cards')) {
                            PlanDayCreate.planBuckets[timeIndex]['cards'] = [];
                        }
                        var objInd = actionsArr.id;
                        PlanDayCreate.planBuckets[timeIndex].cards.push(actionsArr[objInd]);
                    }
                }); //end of actionsArr loop
            });//end of timeLine loop

            return PlanDayCreate.planBuckets;

            function isObjAndHasNoField(obj, field) {
                if (!(typeof obj == 'object')) {
                    return false;
                }
                if (!(field in obj)) {
                    return true;
                }
                return 2;
            }
        }

        function modyfyCardsDataForPopUp(data) {
            var arr = [];
            for (var key in data) {
                // var name = (respond.data.data[key].name.indexOf('<h2>') > -1) ? respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1] : respond.data.data[key].name;
                arr[key] = {
                    id: key,
                    name: modyfyName(data[key].name),
                    type: 'RECEIPT'
                };
            }
            return arr;
        }

        function modyfyName(name) {
            return (name.indexOf('<h2>') > -1) ? name.match(/<h2>(.*?)<\/h2>/i)[1] : name;
        }
    }
})();
/**
 * Created by HP on 12/22/2016.
 */
