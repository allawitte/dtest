(function () {
    'use strict';

    angular
        .module ('app')
        .factory ('Functions', Functions);
    Functions.$inject=['$http', 'API_ENDPOINT', '$state'];

    function Functions ($http, API_ENDPOINT, $state) {
        var service={};

        service.getUnits = getUnits;
        return service;

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
    }
})();

/**
 * Created by HP on 12/25/2016.
 */
