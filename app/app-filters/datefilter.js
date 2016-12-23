(function () {
    'use strict';
    angular
        .module('app')
        .filter('dateFilter', function () {
            return function (item) {
                console.log('item', item);
                if (item) {
                    var currDate = item + '';
                    return moment(currDate.substring(0, 4) + '-' + currDate.substring(4, 6) + '-' + currDate.substring(6, 8)).format('dddd, MMMM DD YYYY');
                }
            }
        })
})();

/**
 * Created by HP on 12/16/2016.
 */
