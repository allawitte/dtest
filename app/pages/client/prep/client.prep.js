(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientPrepController', ClientPrepController);

    ClientPrepController.$inject = ['$state', '$rootScope', 'ReceiptService', '$sce'];
    /* ngInject */
    function ClientPrepController($state, $rootScope, ReceiptService, $sce) {
        $rootScope.header = true;
        $rootScope.page.id = 'prep-page';
        console.log('PrepCtrl');


    }
})();
/**
 * Created by HP on 10/2/2016.
 */
