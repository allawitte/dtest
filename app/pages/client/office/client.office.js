(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientOfficeController', ClientOfficeController);

    ClientOfficeController.$inject = ['$state', '$rootScope', 'ProgramsService', 'localStorageService', '$sce', '$scope', '$route', '$location'];
    /* ngInject */
    function ClientOfficeController($state, $rootScope, ProgramsService,localStorageService, $sce, $scope, $route, $location) {
        var vm = this;
        var plans = [];
        vm.currentDay = 0;
        var planslenght = 0;
        vm.back = back;
        vm.forward = forward;
        vm.showPage = showPage;
        var buttons = ['PLANDAY.COOK', 'PLANDAY.DO', 'PLANDAY.LOOK'];
        var userId = $state.params.userId;
        vm.plan = {};
        var ingrArr = [];
        $scope.mainPart = false;
        //$rootScope.header = true;
        console.log('OfficeCtrl');

        function showPage(object){
            localStorageService.set('oneDay', object);
            $scope.mainPart = true;
            if('cardType' in object){
                $state.go('card');
            }
            else {
                $state.go('receipt');
            }

        }
        function forward(){
            if(vm.currentDay < planslenght-1) {
                vm.currentDay++;
                vm.plan = plans[vm.currentDay];
            }
        }

        function back(){
            if(vm.currentDay > 0){
                vm.currentDay --;
                vm.plan = plans[vm.currentDay];
            }
        }
        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });

        $rootScope.$watch(function () {
            return $location.path()
        }, function (newLocation, oldLocation) {
            if ($rootScope.actualLocation === newLocation) {
                if(newLocation == '/client/office/AVgx_-Dbw90xysTpf8Ns')
                    $scope.mainPart = false;
                console.log('changed');
            }
        });
        $scope.setUpdate = function(data){
            $scope.mainPart = data;
        }
        ProgramsService.getProgram(userId, function (response) {

            console.log('response:', response.data);
            for (var key in response.data) {
                response.data[key]['key'] = key;
                var todo = [];
                response.data[key]['planBuckets'].forEach(function (item, ind) {
                    if(item != null){
                        var dt = new Date(item.bucketTimestamp);
                        var minutes = dt.getMinutes() == 0 ? dt.getMinutes() + '0' : dt.getMinutes();
                        var time = dt.getHours() + ':' + minutes;
                        if ('cards' in item) {
                            item.cards.forEach(function (itm) {
                                if(itm != null){
                                    var preview = {
                                        name: itm.textShort,
                                        img: itm.titlePhoto,
                                        text: itm.textLong,
                                        btn: ''
                                    };


                                    if (itm.cardType == "ACTION") {
                                        preview.btn = buttons[1];
                                        preview.icon = 'img/fire.png'
                                    }
                                    else {
                                        preview.btn = buttons[2];
                                    }
                                    todo.push({
                                        time: time,
                                        preview: preview,
                                        obj: itm
                                    });
                                }//end if
                            });//end forEach
                        }
                        if ('recipes' in item) {
                            item.recipes.forEach(function (itm) {
                                if( itm != null) {
                                    if ('dailyCalories' in itm) {
                                        if (itm.dailyCalories.length>0) {
                                            if ('value' in itm.dailyCalories[0]) {
                                                var calories=itm.dailyCalories[0].value;
                                            }
                                        }
                                    }
                                    else {
                                        var calories=false;
                                    }
                                    if ('ingredients' in itm) {
                                        itm.ingredients.forEach (function (elem) {
                                            ingrArr.push (elem);
                                        });
                                    }
                                    var name=itm.name.indexOf ('<h2>')> -1 ? itm.name.match (/<h2>(.*?)<\/h2>/i)[1] : itm.name;
                                    var preview={
                                        btn: buttons[0],
                                        name: name,
                                        text: itm.shortDescription,
                                        cooktime: itm.timeCookMinutes,
                                        calories: calories,
                                        img: itm.photo,
                                        icon: 'img/plate.png'
                                    };
                                    itm['btn']=buttons[0];
                                    todo.push ({
                                            time: time,
                                            preview: preview,
                                            obj: itm
                                        }
                                    );
                                }
                            });//end forEach
                        }
                    }

                });//end for Each
                //console.log('planDate:',  moment(Date(response.data[key].planDate).getFullYear, Date(response.data[key].planDate).getMonth, Date(response.data[key].planDate).getDate).format('dddd, MMMM DD YYYY'),'  ',Date(response.data[key].planDate));
                var currDate = response.data[key].planDate + '';
                plans.push({
                    //planDate: moment(currDate.substring(0,4)+'-'+ currDate.substring(4,6)+'-'+ currDate.substring(6,8)).format('dddd, MMMM DD YYYY'),
                    planDate: response.data[key].planDate,
                    memberId: response.data[key].memberId,
                    todo: todo
                });
            }
            ;
            planslenght = plans.length;
            plans.sort(function(a,b){
                if(a.planDate > b.planDate) {
                    return 1;
                }
                if(a.planDate < b.planDate) {
                    return -1;
                }
                if(a.planDate == b.planDate) {
                    return 0;
                }
            });
            console.log('plans', plans);
            vm.plan = plans[vm.currentDay];
            localStorageService.set('ingrArr', ingrArr);
        });

    }
})();
/**
 * Created by HP on 10/2/2016.
 */
