(function () {
    'use strict';

    angular
        .module ('app')
        .factory ('Functions', Functions);
    Functions.$inject=['$http', 'API_ENDPOINT', '$state'];

    function Functions($http, $state) {
        var service={};
        var buttons = ['PLANDAY.COOK', 'PLANDAY.DO', 'PLANDAY.LOOK'];

        service.getUnits = getUnits;
        service.getLevel = getLevel;
        service.getDailyCalories = getDailyCalories;
        service.getReceiptName = getReceiptName;
        service.getReceiptSubName = getReceiptSubName;
        service.makeTitle = makeTitle;
        service.getTime = getTime;
        service.getCardPreview = getCardPreview;
        service.getReceiptPreview = getReceiptPreview;
        service.getDailyCaloriesForPreview = getDailyCaloriesForPreview;
        service.isObjectInArray = isObjectInArray;
        service.formatPlanDateForMoment = formatPlanDateForMoment;

        return service;

        function formatPlanDateForMoment(data){
            data += '';
           return data.substring(0, 4) + '-' + data.substring(4, 6) + '-' + data.substring(6, 8)
        }

        function isObjectInArray(arr, item, field){
            var equelIndex = false;
            if(arr.length == 0) {
                return false;
            }
            var compareResult = arr.some(function(itm, indx){
                equelIndex = indx;
                return (itm[field].toUpperCase() == item[field].toUpperCase());
            });
            if(compareResult){
                return equelIndex;
            }
            else {
                return false;
            }
        }

        function getDailyCaloriesForPreview (itm) {
            if ('dailyCalories' in itm) {
                if (itm.dailyCalories.length>0) {
                    if ('value' in itm.dailyCalories[0]) {
                        return itm.dailyCalories[0].value;
                    }
                }
            }
            else {
                return false;
            }
        }

        function getReceiptPreview (itm) {
            return {
                btn: buttons[0],
                name: service.getReceiptName (itm.name),
                text: itm.shortDescription,
                cooktime: itm.timeCookMinutes,
                calories: service.getDailyCaloriesForPreview(itm),
                img: itm.photo,
                icon: 'img/plate.png'
            };
        }

        function getCardPreview (itm) {
            if (itm.cardType == "ACTION") {
                return {
                    name: itm.textShort,
                    img: itm.titlePhoto,
                    text: itm.textLong,
                    btn: buttons[1],
                    icon: 'img/fire.png'
                };
            }
            else {
                return {
                    name: itm.textShort,
                    img: itm.titlePhoto,
                    text: itm.textLong,
                    btn: buttons[2]
                };
            }
        }


        function getTime (str) {

            var dt = new Date(str);
            var minutes=dt.getMinutes ()==0 ? dt.getMinutes ()+'0' : dt.getMinutes ();
            return dt.getHours ()+':'+minutes;
        }


        function makeTitle (name, subname) {
            if(!name) return '';
            return '<h2>'+name+'</h2><span>'+subname+'</span>';
        }

        function getReceiptSubName (header) {
            if(header.search('<span>') == -1){
                return '';
            }
            return header.match (/<span>(.*?)<\/span>/i)[1];
        }

        function getReceiptName (header) {
            if(header.search('<h2>') == -1){
                return header;
            }
            return header.match (/<h2>(.*?)<\/h2>/i)[1];
        }

        function getUnits () {
            return [
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
        }

        function getLevel () {
            return [
                'EASY',
                'MEDIUM',
                'HARD'
            ];
        }

        function getDailyCalories () {
            return [
                {type: 'CALORIE', value: '', dayPercentageCount: 0},
                {type: 'FAT', value: '', dayPercentageCount: 0},
                {type: 'CARBOHYDRATE', value: '', dayPercentageCount: 0},
                {type: 'PROTEIN', value: '', dayPercentageCount: 0}
            ];
        }
    }
})();

/**
 * Created by HP on 12/25/2016.
 */
