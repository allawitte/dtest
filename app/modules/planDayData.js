(function() {
    'use strict';

    angular
        .module('app')
        .factory('PlanDaysData', PlanDaysData);
    PlanDaysData.$inject = ['Functions'];

    function PlanDaysData(Functions) {
        /*
         service.data :[0:
         ObjectmemberId: "AVgx_-Dbw90xysTpf8Ns",
         planDate: 20161228,
         todo: [
         timestamp: number,
         obj: {} //full receipt of card data
         preview: {}//parametrs only for preview receipt of card in plan day page
         ],
         1: ...
         */
        var service = {};
        service.setData = setData;
        service.getFirstDay = getFirstDay;
        service.getFirstDate = getFirstDate;
        service.getLastDay = getLastDay;
        service.getLastDate = getLastDate;
        service.getDay = getDay;
        service.getToday = getToday;
        service.getTodayPlan = getTodayPlan;
        service.setFullPageData = setFullPageData;
        service.getFullPageData = getFullPageData;
        service.setCurrentDay = setCurrentDay;
        service.getCurrentDay = getCurrentDay;
        service.getIngredients = getIngredients;
        service.getAvailableDates = getAvailableDates;
        service.getIngredientsByPeriod = getDataArrByPeriod;
        service.getMinIndexByDate = getMinIndexByDate;

        return service;

        function getMinIndexByDate(date){
            var index;
            var isDayEqualOrLess = service.data.some(function(item, indx){
                index = indx;
                return (item.planDate > date)
            });
            if(isDayEqualOrLess){
                return index;
            }
            else {
                return false;
            }

        }

        function getDataArrByPeriod(start, end){
            return service.data.slice(service.getMinIndexByDate(start),service.getMinIndexByDate(end)+1);

        }

        function getAvailableDates(){
            return {
                min: Functions.formatPlanDateForMoment(getFirstDay().plan.planDate),
                max: Functions.formatPlanDateForMoment(getLastDay().plan.planDate)
            }
        }

        function getIngredients(start, end) {
            var arr = [];
            getDataArrByPeriod(start, end).forEach(function(dayLineUp) {
                dayLineUp.todo.forEach(function(timeLineUp) {
                    if ('ingredients' in timeLineUp.obj) {
                        timeLineUp.obj.ingredients.forEach(function(inredient) {
                            var commonIndex = Functions.isObjectInArray(arr, inredient, 'name');
                            if (commonIndex === false) {
                                arr.push({
                                    value: inredient.value,
                                    name: inredient.name,
                                    unit: inredient.unit
                                });
                            }
                            else {
                               arr[commonIndex]['value'] += inredient['value'];
                            }
                        })
                    }
                })

            });
           return arr;
        }

        function getTodayPlan() {
            for (var i = 0; i < service.data.length; i ++) {
                if (service.data[i].planDate == service.getToday()) {
                    return {
                        plan: service.data[i],
                        dayNumber: i
                    };
                }
            }
        }

        function getLastDate() {
            var day = service.getLastDay();
            return day.plan.planDate;
        }

        function getFirstDate() {
            var day = service.getFirstDay();
            return day.plan.planDate;
        }

        function getToday() {
            return moment().format("YYYYMMDD");
        }

        function getCurrentDay() {
            return service.currentDay;
        }

        function setCurrentDay(day) {
            service.currentDay = day;
            //console.log('currentDay', day);
        }

        function getFullPageData() {
            return service.fullPageData;
        }

        function setFullPageData(data) {
            service.fullPageData = data;

        }

        function getLastDay() {
            return {
                plan: service.data[service.data.length - 1],
                dayNumber: service.data.length - 1
            };
        }

        function getDay(index) {
            if (index < service.data.length && index > - 1) {
                return {
                    plan: service.data[index],
                    dayNumber: index
                };
            }
            if (index >= service.data.length) {
                return getLastDay();
            }
            if (index < 0) {
                return getFirstDay()
            }

        }

        function getFirstDay() {
            return {
                plan: service.data[0],
                dayNumber: 0
            };

        }

        function setData(data) {
            service.data = data;
        }
    }
})();
/**
 * Created by HP on 12/27/2016.
 */
