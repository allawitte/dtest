(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlanDayTransfer', PlanDayTransfer);

    PlanDayTransfer.$inject = ['$http', '$q', 'API_ENDPOINT'];

    function PlanDayTransfer($http, $q, API_ENDPOINT) {
        var service = {};
        service.modyfyFromServer = modifyFromServer;
        service.modifyToServer = modifyToServer;
        service.modifyCardsDataForLine = modifyCardsDataForLine;
        service.modifyCardsDataForPopUp = modifyCardsDataForPopUp;
        service.formatPlanDay = formatPlanDay;
        service.changeDateAndKeepTime = changeDateAndKeepTime;
        service.getAllReceiptsAndCards = getAllReceiptsAndCards;
        service.setReceipts = setReceipts;
        service.setActions = setActions;
        service.setPlan = setPlan;
        service.getPlan = getPlan;
        service.deletePlan = deletePlan;
        service.updateAction = updateAction;
        service.updateReceipts = updateReceipts;
        service.setCards = setCards;
        service.getCards = getCards;
        service.setCardsIndex = setCardsIndex;
        service.getCardsIndex = getCardsIndex;

        var recipes = {};
        var actions = {};
        var plan = [];
        var cards = null;
        var cardsIndex = null;

        return service;

        function getCardsIndex() {
            return cardsIndex;
        }

        function getCards() {
            return cards;
        }

        function setCardsIndex(data) {
            cardsIndex = data;
        }

        function setCards(data) {
            cards = data;
        }

        function updateReceipts(id, data) {
            recipes[id] = data;
        }

        function updateAction(id, data) {
            actions[id] = data;
        }

        function deletePlan() {
            plan = [];
        }

        function getPlan() {
            return plan;
        }

        function setPlan(data) {
            plan = data;
        }

        function setActions(data) {
            actions = data;
        }

        function setReceipts(data) {
            recipes = data;
        }

        function getAllReceiptsAndCards() {
            return $q.all({
                receipts: $http.get(API_ENDPOINT + "/recipes?size=100&from=0"),
                cards: $http.get(API_ENDPOINT + "/cards?size=100&from=0")
            });
        }

        function changeDateAndKeepTime(newDate, oldDate) {
            return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), oldDate.getHours(), oldDate.getMinutes());
        }

        function formatPlanDay(date) {
            var beginDay = new Date(Date.parse(date));
            var year = beginDay.getFullYear();
            var month = beginDay.getMonth() < 10 ? '0' + (beginDay.getMonth() + 1) : beginDay.getMonth() + 1;
            var day = beginDay.getDate() < 10 ? '0' + beginDay.getDate() : beginDay.getDate();
            return year + '-' + month + '-' + day;
        }

        function modifyFromServer() {

        }

        function modifyCardsDataForLine() {

            var data = Object.assign(recipes, actions);
            var arr = [];
            for (var key in data) {
                if ('cardType' in data[key]) {
                    arr.push({
                        id: key,
                        name: data[key].textShort,
                        type: data[key].cardType
                    });
                }
                else if ('name' in data[key]) {
                    arr.push({
                        id: key,
                        name: modifyName(data[key].name),
                        type: 'RECEIPT'
                    });
                }
            }
            data = null;
            return arr;
        }


        function modifyToServer(model) {
            var PlanDayCreate = {};
            PlanDayCreate.planBuckets = [];
            model.plan.forEach(function (timeLine, timeIndex) {
                PlanDayCreate.planBuckets.push({'bucketTimestamp': Date.parse(timeLine.time)});

                timeLine.actions.forEach(function (actItem) {
                    if (actItem.type == 'RECEIPT') {
                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'recipes')) {
                            PlanDayCreate.planBuckets[timeIndex].recipes = [];
                        }
                        var objInd = actItem.id;
                        PlanDayCreate.planBuckets[timeIndex].recipes.push(recipes[objInd]);
                    }
                    else if (actItem.type == 'ACTION' || actItem.type == 'RECOMMENDATION') {

                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'cards')) {
                            PlanDayCreate.planBuckets[timeIndex]['cards'] = [];
                        }
                        PlanDayCreate.planBuckets[timeIndex].cards.push(actions[actItem.id]);
                    }
                }); //end of actions loop
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

        function modifyCardsDataForPopUp() {
            var data = Object.assign(recipes, actions);
            var arr = [];
            for (var key in data) {
                if ('cardType' in data[key]) {
                    arr[key] = {
                        id: key,
                        name: data[key].textShort,
                        type: data[key].cardType
                    };
                }
                else if ('name' in data[key]) {
                    arr[key] = {
                        id: key,
                        name: modifyName(data[key].name),
                        type: 'RECEIPT'
                    };
                }

            }
            data = null;
            return arr;
        }

        function modifyName(name) {
            return (name.indexOf('<h2>') > -1) ? name.match(/<h2>(.*?)<\/h2>/i)[1] : name;
        }
    }
})();
/**
 * Created by HP on 12/22/2016.
 */
