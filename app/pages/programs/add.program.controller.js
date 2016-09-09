(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProgramController', ProgramController);

    ProgramController.$inject = ['UserService', 'ReceiptService', 'CardsService', 'ProgramsService', '$state', '$scope', '$sce', '$timeout'];

    function ProgramController(UserService, ReceiptService, CardsService, ProgramsService, $state, $scope, $sce, $timeout) {
        var vm = this;
        vm.addTime = addTime;
        vm.addDay = addDay;
        vm.trustSrc = trustSrc;
        vm.changed = changed;
        vm.onSelectCallback = onSelectCallback;
        vm.addCard = addCard;
        vm.closeModal = closeModal;
        vm.pendCard = pendCard;
        vm.changeCard = changeCard;
        vm.send = send;
        vm.cancel = cancel;
        vm.program = {};
        vm.program.days = [[]];
        vm.cards = [];
        vm.cardsIndex = [];
        vm.receipts = [];
        vm.actions = [];
        vm.PlanDayCreate = {};
        vm.PlanDayCreate.planBuckets = [];
        vm.PlanDayCreate.memberId = $state.params.userId;
        vm.showUsersList = $state.params.userId;
        vm.modalClose = true;
        vm.users = [];
        vm.user = {};
        var currentTime = 0;
        var curentDay = 0;
        var currentAct = 0;
        var option = "?size=100&from=0";

        //time picker initialisation
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.update = update;
        $scope.ismeridian = false;
        //end of initilisation

        //***  timepicker  functions  *****
        var initDay = update(0);
        vm.program.days[0] = [{time: initDay, actions: [{}]}];
        function addTime(dayIndex) {

            vm.program.days[dayIndex].push({time: update(dayIndex), actions: [{}]});
            currentTime = vm.program.days[dayIndex].length - 1;
            currentAct = 0;
        }

        function addDay() {
            var len = vm.program.days.length;
            initDay = update(len);
            vm.program.days.push([{time: initDay, actions: [{}]}]);
            currentTime = 0;
            curentDay = vm.program.days.length - 1;
            currentAct = 0;
        }


        if (!vm.program.memberId) {
            UserService.GetAll(option).then(function (respond) {
                var i = 0;
                for (var key in respond.data.data.data) {
                    vm.users.push(respond.data.data.data[key]);
                    vm.users[i].id = key;
                    i++;
                }

            });
        }


        function update(dayPlus) {
            var d = new Date(2000, 1, 1 + dayPlus);
            d.setHours(7);
            d.setMinutes(0);
            console.log(vm.program.days);
            return d;
        };

        function changed(dayIndex) {
            $timeout(function () {
                vm.program.days[dayIndex].sort(compareTime);
            }, 2000);
        };
        //*****   end of timepicker    *******

        //**** download all cards and receipts and forming of cards list ******
        ReceiptService.getAllReceipts(function (respond) {
            vm.receipts = respond.data.data;
            for (var key in respond.data.data) {

                vm.cards.push({
                    id: key,
                    name: respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1],
                    type: 'RECEIPT'
                });
                vm.cardsIndex[key] = {
                    id: key,
                    name: respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1],
                    type: 'RECEIPT'
                };
            }
            ;
        });

        CardsService.getAllActions(option, function (respond) {
            vm.actions = respond.data.data;
            for (var key in respond.data.data) {

                vm.cards.push({id: key, name: respond.data.data[key].textShort, type: respond.data.data[key].cardType});
                vm.cardsIndex[key] = {
                    id: key,
                    name: respond.data.data[key].textShort,
                    type: respond.data.data[key].cardType
                };
            }
            ;

        });

        //****  end of download

        function trustSrc(src) {
            return $sce.trustAsHtml(src);
        }


        function onSelectCallback(item, timeIndex, dayIndex, actIndex) {
            item.selected = item.name;
            vm.program.days[dayIndex][timeIndex].actions[actIndex] = item;

        };

        function addCard(timeIndex, dayIndex) {
            vm.program.days[dayIndex][timeIndex].actions.push({});
            vm.modalClose = false;
            currentTime = timeIndex;
            curentDay = dayIndex;
            currentAct = vm.program.days[dayIndex][timeIndex].actions.length - 1;

        }

        function compareTime(time1, time2) {
            return time1.time - time2.time;
        }

        function closeModal() {
            vm.modalClose = true;
        }

        function pendCard(id) {
            vm.program.days[curentDay][currentTime].actions[currentAct] = vm.cardsIndex[id];
        }

        function changeCard(dayIndex, timeIndex, actIndex) {
            vm.modalClose = false;
            var currentTime = timeIndex;
            var curentDay = dayIndex;
            var currentAct = actIndex;
        }

        function send() {
            if(!vm.PlanDayCreate.memberId) {
                vm.PlanDayCreate.memberId = vm.user.memberId;
            };
            vm.PlanDayCreate.planDay = vm.program.planDay;
            var index = 0;
            for ( var i = 0; i < vm.program.days.length; i ++) {
                for ( var j = 0; j < vm.program.days[i].length; j ++) {
                    vm.PlanDayCreate.planBuckets.push({'bucketTimestamp': Date.parse(vm.program.days[i][j].time)});
                    for ( var k = 0; k < vm.program.days[i][j].actions.length; k ++ )
                    if (vm.program.days[i][j].actions[k].type == 'RECEIPT') {
                        if ( !('recipes' in vm.PlanDayCreate.planBuckets[index]) ) {
                            vm.PlanDayCreate.planBuckets[index].recipes = [];
                        }
                        vm.PlanDayCreate.planBuckets[index].recipes.push(vm.receipts[vm.program.days[i][j].actions[k].id]);
                    }
                    else {
                        if ( !('cards' in vm.PlanDayCreate.planBuckets[index])) {
                            vm.PlanDayCreate.planBuckets[index].cards = [];
                        }
                        vm.PlanDayCreate.planBuckets[index].cards.push(vm.actions[vm.program.days[i][j].actions[k].id]);
                    }
                    index ++;
                }
            }
            ProgramsService.uploadProgram(vm.PlanDayCreate, function(data){
                console.log(data);
            });

        }

        function cancel() {

        }
    }
})();
/**
 * Created by Alla on 8/10/2016.
 */
