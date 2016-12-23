(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditActionController', EditActionController);

    EditActionController.$inject = ['UtilsService', 'CardsService', '$state', '$scope', '$sce'];

    function EditActionController(UtilsService, CardsService, $state, $scope, $sce) {
        var vm = this;
        var id = $state.params.actionID;
        vm.Actions = {};
        vm.photos = [];
        vm.videos = [];
        vm.savedPhotos = [];
        vm.fileUplView = [];
        vm.selectedType = [];
        vm.isTitlePhoto = false;
        vm.cardType = [{value: 'ACTION', title: 'ACTIONS.ACTION'},{value:'RECOMMENDATION', title: 'ACTIONS.RECOMMENDATION'}];
        vm.removetitlePhoto = removetitlePhoto;
        vm.saveImg = saveImg;
        vm.removeImg = removeImg;
        vm.removeRowPhoto = removeRowPhoto;
        vm.addImg = addImg;
        vm.send = send;
        vm.cancel = cancel;
        vm.deleteAction = deleteAction;
        vm.trustSrc = trustSrc;
        vm.addVideo = addVideo;
        vm.deleteVideo = deleteVideo;
        vm.deleteExistVideo = deleteExistVideo;
        vm.changeBtn = changeBtn;
        vm.noName = false;



        function changeBtn(index, type) {

            if (type == 'type') {
                console.log(type);
                vm.selectedType = [false, false];
                vm.selectedType[index] = true;
            }
        }

        function deleteExistVideo(index) {
            vm.Actions.videos.splice(index, 1);
        }
        function addVideo() {
            vm.videos.push({});
        }

        function deleteVideo(index) {
            vm.videos.splice(index, 1);
        }

        CardsService.getActionById(id, function(response) {
            vm.Actions = response.data;
            if (('titlePhoto' in vm.Actions) && (vm.Actions.titlePhoto != '')) {
                vm.isTitlePhoto = true;
            }
            if (vm.Actions.cardType == 'ACTION') {
                vm.selectedType = [true, false];
            }
            if (vm.Actions.cardType == 'RECOMMENDATION') {
                vm.selectedType = [false, true];
            }
            else {
                vm.selectedType = [false, false];
            }

        });

        function deleteAction() {
            CardsService.deleteAction(id, function(response){
                console.log(response);
                $state.go('/actions.list');
            });
        }

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function addImg() {
            vm.photos.push({});
            var index = vm.photos.length;
            vm.savedPhotos[index-1] = false;
            vm.fileUplView[index-1] = true;
        }

        function removeRowPhoto(index) {
            vm.Actions.photos.splice(index, 1);
        }

        function removeImg(index) {
            if (index != undefined) {
                vm.savedPhotos.splice(index, 1);
                vm.photos.splice(index, 1);
            }
            else {
                vm.Actions.titlePhoto = "";
                vm.imgLoaded = false;
            }
        }

        function saveImg(img, index) {
            UtilsService.imgUpload(img, function(response) {
                if (index != undefined) {
                    vm.savedPhotos[index] = response.data
                    vm.fileUplView[index] = false;
                }
                else {
                    vm.Actions.titlePhoto = response.data;
                    vm.imgLoaded = true;
                }
            });

        }

        function removetitlePhoto() {
            vm.Actions.titlePhoto = "";
            vm.isTitlePhoto = false;
        }
        function send() {

            for ( var i = 0; i < vm.savedPhotos.length; i++ ) {
                vm.Actions.photos.push(vm.savedPhotos[i]);
            }
            for ( var i = 0; i < vm.videos.length; i ++ ) {
                if ('value' in vm.videos[i]) {
                    var str = vm.videos[i].value;

                    var match = str.match(/https([\s\S]*?)\"/);
                    vm.Actions.videos.push(match[0].replace('"', ''));
                }
            }
            if ( vm.Actions.textShort ) {
                CardsService.updateAction(id, vm.Actions, function (response) {
                    $state.go('/actions.list');
                });
            }
            else vm.noName = true;

        }

        function cancel(){
            $state.go('/actions.list');
        }

    }
})();/**
 * Created by Alla on 8/16/2016.
 */
