(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddActionController', AddActionController);

    AddActionController.$inject = ['UtilsService', 'CardsService',  '$state', '$scope', '$sce'];

    function AddActionController(UtilsService, CardsService, $state, $scope, $sce) {
        var vm = this;
        vm.addImg = addImg;
        vm.saveImg = saveImg;
        vm.send = send;
        vm.removeImg = removeImg;
        vm.changeImg = changeImg;
        vm.trustSrc = trustSrc;
        vm.changeBtn = changeBtn;
        vm.addVideo = addVideo;
        vm.deleteVideo = deleteVideo;
        vm.Actions = {photos: [], videos: []};
        vm.videos = [];
        vm.photos = [];
        vm.photosOk = [];
        vm.chooseMedia = [{title: 'ACTIONS.CHOOSEPICTURES', value: 'picture'}, {title: 'ACTIONS.CHOOSEVIDEOS', value: 'video'}];
        vm.videosource = [{title:'ACTIONS.YOUTUBESOURCE', value: 'youtube'}, {title: 'ACTIONS.LOCALSOURCE', value: 'local'}];
        vm.cardType = [{value: 'ACTION', title: 'ACTIONS.ACTION'},{value:'RECOMMENDATION', title: 'ACTIONS.RECOMMENDATION'}];
        vm.selectedMedia = [false, false];
        vm.selectedSource = [false, false];
        vm.selectedType = [false, false];
        vm.mediaType = false;
        vm.sourceVideo = false;
        vm.noName = false;
        vm.noType = false;

        function addVideo() {
            vm.videos.push({});
        }

        function deleteVideo(index) {
            vm.videos.splice(index, 1);
        }

        function changeBtn(index, type) {

            if (type == 'type') {
                console.log(type);
                vm.selectedType = [false, false];
                vm.selectedType[index] = true;
                vm.noType = false;
            }
            if (type == 'media') {
                vm.selectedMedia = [false, false];
                vm.selectedMedia[index] = true;
            }
            if ( type == 'video') {
                vm.selectedSource = [false, false];
                vm.selectedSource[index] = true;
            }
        }

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }

        function changeImg(index) {
            vm.photosOk[index] = false;
        }

        function addImg() {
            vm.photos.push({});
        }

        function saveImg (img, index) {

            UtilsService.imgUpload(img, function (response) {
                if (response.data) {
                    if (index != undefined) {
                        vm.Actions.photos[index] = response.data;
                        vm.photosOk[index] = true;
                    } else {
                        vm.Actions.titlePhoto = response.data;
                        vm.imgLoaded = true;
                    }
                }
            });

        }
        function removeImg(index) {
            if (index != undefined) {
                vm.photos.splice(index, 1);
            }
            else {
                vm.Actions.titlePhoto = "";
                vm.imgLoaded = false;
            }
        }

        function send() {

            for ( var i = 0; i < vm.videos.length; i ++ ) {
                if ('value' in vm.videos[i]) {
                    var str = vm.videos[i].value;

                    var match = str.match(/https([\s\S]*?)\"/);
                    vm.Actions.videos.push(match[0].replace('"', ''));
                }
            }

            if( !vm.Actions.cardType ) {
                vm.noType = true;
            }
            else vm.noType = false;
            if ( !vm.Actions.textShort ) {
                vm.noName = true;
            }
            else vm.noName = false;
            console.log()
            if ( !vm.noName && !vm.notype ) {
                CardsService.actionUpload(vm.Actions, function (data) {
                    $state.go('/actions.list');
                });
            }
        }
    }
})();/**
 * Created by Alla on 8/12/2016.
 */
