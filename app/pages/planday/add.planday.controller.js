(function() {
    'use strict';

    angular
        .module('app')
        .controller('PlandayController', PlandayController);

    PlandayController.$inject = ['UserService', 'ProgramsService', '$state', '$scope', '$sce', '$timeout', 'PlanDayTransfer', '$location'];

    function PlandayController(UserService, ProgramsService, $state, $scope, $sce, $timeout, PlanDayTransfer, $location) {
        var vm = this;
        vm.addTime = addTime;
        var setTm = new Date();
        var setYr = setTm.getFullYear();
        var setMon = setTm.getMonth();
        var setDy = setTm.getDate();
        var setHr = 7;
        vm.allowSave = true;
        vm.dt = new Date(setYr, setMon, setDy, setHr);
        vm.trustSrc = trustSrc;
        vm.changed = changed;
        vm.onSelectCallback = onSelectCallback;
        vm.addCard = addCard;
        vm.closeModal = closeModal;
        vm.pendCard = pendCard;
        vm.changeCard = changeCard;
        vm.deleteTimeLine = deleteTimeLine;
        vm.send = send;
        vm.cancel = cancel;
        vm.deleteCard = deleteCard;
        vm.program = {};
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
        vm.editCard = editCard;

        var currentTime = 0;
        var currentAct = 0;
        var option = "?size=100&from=0";
        var initTime = 7;

        vm.program = PlanDayTransfer.getPlan();
        PlanDayTransfer.deletePlan();
        vm.cards = PlanDayTransfer.getCards();
        vm.cardsIndex = PlanDayTransfer.getCardsIndex();



        //time picker initialisation
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.ismeridian = false;

        //end of initilisation

        //***  timepicker  functions  *****

        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        var initDay = update();
        if (!('plan' in vm.program)) {
            vm.program.plan = [];
            vm.program.plan.push({
                time: initDay,
                actions: []
            });
            PlanDayTransfer.getAllReceiptsAndCards()
                .then(function(respond) {
                    vm.receipts = respond.receipts.data.data.data;
                    vm.actions = respond.cards.data.data.data;
                    PlanDayTransfer.setReceipts(vm.receipts);
                    PlanDayTransfer.setActions(vm.actions);
                    vm.cards = PlanDayTransfer.modifyCardsDataForLine();
                    vm.cardsIndex = PlanDayTransfer.modifyCardsDataForPopUp();
                });
        }

        function addTime() {
            initTime += 2;
            vm.program.plan.push({time: update(), actions: []});
            currentTime = vm.program.plan.length - 1;
            currentAct = 0;
            console.log('vm.program.plan', vm.program.plan);
        }

        $scope.$watch(function() {
            return vm.dt;
        }, function(newVal, oldVal) {
            vm.program.plan.forEach(function(item) {
                item.time = PlanDayTransfer.changeDateAndKeepTime(vm.dt, item.time);
            })
        });

        if (! vm.program.memberId) {
            UserService.GetAll(option).then(function(respond) {
                var i = 0;
                for (var key in respond.data.data.data) {
                    vm.users.push(respond.data.data.data[key]);
                    vm.users[i].id = key;
                    i ++;
                }

            });
        }

        function editCard($event, timeInd, actInd) {
            $event.stopPropagation();
            //console.log('edit', vm.program.plan[timeInd].actions[actInd]);
            PlanDayTransfer.setPlan(vm.program);
            PlanDayTransfer.setCards(vm.cards);
            PlanDayTransfer.setCardsIndex(vm.cardsIndex);
            if (vm.program.plan[timeInd].actions[actInd].type == 'RECEIPT') {
                $state.go('/receipts.edit', {receiptID: vm.program.plan[timeInd].actions[actInd].id})
            }
            else {
                $state.go('/actions.edit', {actionID: vm.program.plan[timeInd].actions[actInd].id})
            }

        }

        function deleteCard($event, timeInd, actInd) {
            $event.stopPropagation();
            vm.program.plan[timeInd].actions.splice(actInd, 1);

        }

        function deleteTimeLine(index) {
            vm.program.plan.splice(index, 1);
        }

        function update() {
            var d = new Date(Date.parse(vm.dt));
            d.setHours(initTime);
            d.setMinutes(0);
            return d;
        }

        function changed() {
            $timeout(function() {
                vm.program.plan.sort(compareTime);
            }, 2000);
        }

        //*****   end of timepicker    *******

        if (vm.showUsersList) {
            UserService.GetById(vm.showUsersList)
                .then(function(data) {
                    vm.user = data.data.data.user;
                });
        }

        function trustSrc(src) {
            return $sce.trustAsHtml(src);
        }

        function onSelectCallback(item, timeIndex, actIndex) {
            item.selected = item.name;
            vm.program.plan[timeIndex].actions[actIndex] = item;

        }

        function addCard(timeIndex) {
            vm.program.plan[timeIndex].actions.push({});
            vm.modalClose = false;
            currentTime = timeIndex;
            currentAct = vm.program.plan[timeIndex].actions.length - 1;
        }

        function compareTime(time1, time2) {
            return time1.time - time2.time;
        }

        function closeModal() {
            vm.modalClose = true;
            cleanJuncCards();
        }

        function pendCard(id) {
            vm.program.plan[currentTime].actions[currentAct] = vm.cardsIndex[id];
            vm.modalClose = true;
        }

        function cleanJuncCards() {
            vm.program.plan.forEach(function(item, index) {
                item.actions.forEach(function(itm, idx) {
                    if (JSON.stringify(itm) == '{}') {
                        item.actions.splice(idx, 1);
                    }
                })
            })
        }

        function changeCard(timeIndex, actIndex) {
            vm.modalClose = false;
            var currentTime = timeIndex;
            var currentAct = actIndex;
        }

        function clearPlanDay() {
            var tmp = vm.PlanDayCreate.memberId;
            vm.PlanDayCreate = {};
            vm.PlanDayCreate.memberId = tmp;
            vm.PlanDayCreate.planBuckets = [];
        }

        function send() {
            vm.planErrorArr = '';
            vm.planErrorUser = '';
            vm.uploadError = '';
            vm.alreadyExistsError = '';
            vm.allowSave = true;
            vm.PlanDayCreate.planDay = PlanDayTransfer.formatPlanDay(vm.dt);

            if (! vm.PlanDayCreate.memberId) {
                vm.PlanDayCreate.memberId = vm.user.id;
            }
            var isEmptyLine = vm.program.plan.some(function(timeLine) {
                return timeLine.actions.length == 0;
            });
            if (isEmptyLine) {
                vm.allowSave = false;
                clearPlanDay();
            } else {
                vm.PlanDayCreate.planBuckets = PlanDayTransfer.modifyToServer(vm.program);
            }

            if (vm.allowSave && vm.PlanDayCreate.memberId) {

                ProgramsService.uploadProgram(vm.PlanDayCreate, function(data) {
                    clearPlanDay();
                    console.log(data);
                    var afterLoad = {
                        200: function() {
                            $state.go('/members.view', {"userId": vm.PlanDayCreate.memberId});
                        },
                        453: function() {
                            vm.alreadyExistsError = 'PROGRAM.ERROR-EXISTS';
                        },
                        455: function() {
                            vm.uploadError = 'PROGRAM.ERROR-UPLOAD'
                        }
                    };
                    afterLoad[data]();
                });
            }
            else {
                if (! vm.allowSave) {
                    vm.planErrorArr = 'PROGRAM.ERROR-ARRAY';
                }
                if (! vm.PlanDayCreate.memberId) {
                    vm.planErrorUser = 'PROGRAM.ERROR-USER'
                }
                clearPlanDay();
            }

        }

        function cancel() {
            if (vm.PlanDayCreate.memberId) {
                $state.go('/members.view', {"userId": vm.PlanDayCreate.memberId});
            }
            else {
                $state.go('/members.list');
            }

        }
    }
})();
/**
 * Created by Alla on 8/10/2016.
 */
