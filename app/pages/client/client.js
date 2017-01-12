(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$scope', '$state', 'ProgramsService', 'Functions', 'PlanDaysData'];

    function ClientController($scope, $state, ProgramsService, Functions, PlanDaysData) {
        var vm = this;
        var userId = $state.params.userId;
        $scope.isPlanArrLoaded = false;
        var plans = [];
        console.log('clientCtrl userId:', userId);
        ProgramsService.getProgram(userId, function(response){
            for (var key in response.data) {
                response.data[key]['key'] = key;
                var todo = [];
                response.data[key]['planBuckets'].forEach(function (item) {
                    if(item != null){
                        if ('cards' in item) {
                            item.cards.forEach(function (itm) {
                                if(itm != null){
                                    todo.push({
                                        time: Functions.getTime(item.bucketTimestamp),
                                        preview: Functions.getCardPreview(itm),
                                        obj: itm
                                    });
                                }//end if
                            });//end forEach
                        }
                        if ('recipes' in item) {
                            item.recipes.forEach(function (itm) {
                                if( itm != null) {
                                    todo.push ({
                                        time: Functions.getTime (item.bucketTimestamp),
                                        preview: Functions.getReceiptPreview(itm),
                                        obj: itm
                                    });
                                }
                            });//end forEach
                        }
                    }

                });//end for Each
                plans.push({
                    planDate: response.data[key].planDate,
                    memberId: response.data[key].memberId,
                    todo: todo
                });
            }
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
            PlanDaysData.setData(plans);
            $scope.isPlanArrLoaded = true;
        });
    }
})();
/**
 * Created by HP on 9/28/2016.
 */
