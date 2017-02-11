(function() {
    'use strict';
    angular
        .module('app')
        .filter('dateFilter', dateFilter);
    dateFilter.$inject = ['Functions'];
    function dateFilter(Functions) {
        return function(item) {
            console.log('item', item);
            if (item) {
                return moment(Functions.formatPlanDateForMoment(item)).format('dddd, MMMM DD YYYY');
            }
        }
    }
})();

/**
 * Created by HP on 12/16/2016.
 */
