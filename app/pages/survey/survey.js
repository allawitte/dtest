(function () {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['OpinionService', '$state', 'UserService', 'localStorageService', '$scope'];

    function SurveyController(OpinionService, $state, UserService, localStorageService, $scope) {
        var vm = this;
        var user = {};

        vm.send = send;
        vm.changeGender = changeGender;
        vm.changeBodyType = changeBodyType;
        vm.changeActivity = changeActivity;
        vm.changePurpose = changePurpose;
        vm.stepBar = 'step1';
        vm.step = localStorageService.get('step') || 0;
        vm.stepsActions = [];
        vm.next = next;
        vm.back = back;
        vm.survey = {};
        vm.check1 = false;
        vm.check2 = false;
        vm.check3 = false;
        vm.wrongEmail = false;
        vm.check4 = false;
        vm.check5 = false;
        vm.wrongPass = false;

        //vm.stepsActions[0] = 'active';

        window.onbeforeunload = function () {
            saveDataForReload();
        };


        function setAnswerGroup(){
                if(!localStorageService.get('surveyAnswerGroup')){
                    vm.survey.answerGroups = [];
                    var names = ["цель", 'желаемый вес', "пол", "дата рождения", "рост", "вес", "активность", "телосложение", "имя", 'еиайл', 'пароль', 'телефон']
                        .map(function (item) {
                            return encodeURIComponent(item);
                        });
                    for (var i = 0; i < names.length; i++) {
                        vm.survey.answerGroups[i] = {name: names[i], answerText: ['']};
                    }
                    vm.survey.answerGroups[3].answerText[0] = '1993-07-03';
                    vm.purpose = [
                        {name: 'PURPOSE.1', selected: false},
                        {name: 'PURPOSE.2', selected: false},
                        {name: 'PURPOSE.3', selected: false}
                    ];
                    vm.gender = [
                        {name: 'GENDER.MALE', selected: false},
                        {name: 'GENDER.FEMALE', selected: false}
                    ];
                    vm.activity = [
                        {name: 'SURVEY-HEADERS.INTENS4', selected: false},
                        {name: 'SURVEY-HEADERS.INTENS1', selected: false},
                        {name: 'SURVEY-HEADERS.INTENS2', selected: false},
                        {name: 'SURVEY-HEADERS.INTENS3', selected: false}
                    ];
                    vm.bodytype = [
                        {name: 'BODYTYPE.1', selected: false},
                        {name: 'BODYTYPE.2', selected: false},
                        {name: 'BODYTYPE.3', selected: false}
                    ];
                    vm.stepsActions[0] = 'active';
                }
            else {
                    vm.survey.answerGroups = localStorageService.get('surveyAnswerGroup');
                    vm.purpose = localStorageService.get('purpose');
                    vm.gender = localStorageService.get('gender');
                    vm.activity = localStorageService.get('activity');
                    vm.bodytype = localStorageService.get('bodytype');
                    vm.stepsActions = localStorageService.get('stepsActions');
                }
        }
        function saveDataForReload(){
            localStorageService.set('step', vm.step);
            localStorageService.set('purpose', vm.purpose);
            localStorageService.set('activity', vm.activity);
            localStorageService.set('gender', vm.gender);
            localStorageService.set('bodytype', vm.bodytype);
            localStorageService.set('stepsActions', vm.stepsActions);
            localStorageService.set('surveyAnswerGroup', vm.survey.answerGroups);
        }



        vm.stepsNames = ['SURVEY-HEADERS.STEP1', 'SURVEY-HEADERS.STEP2', 'SURVEY-HEADERS.STEP3', 'SURVEY-HEADERS.STEP4', 'SURVEY-HEADERS.STEP5', 'SURVEY-HEADERS.STEP6'];



        setAnswerGroup();





        function changePurpose(index){
            for (var i = 0; i < 3; i++) {
                vm.purpose[i].selected = false;
            }
            vm.purpose[index].selected = true;
            vm.survey.answerGroups[0].answerText[0] = vm.purpose[index].name;
        }


        function changeGender(index) {
            for (var i = 0; i < 2; i++) {
                vm.gender[i].selected = false;
            }
            vm.gender[index].selected = true;
            vm.survey.answerGroups[2].answerText[0] = vm.gender[index].name;
        }

        function changeBodyType(index) {
            for (var i = 0; i < 3; i++) {
                vm.bodytype[i].selected = false;
            }
            vm.survey.answerGroups[7].answerText[0] = vm.bodytype[index].name;
            vm.bodytype[index].selected = true;
        }

        function changeActivity(index) {
            for (var i = 0; i < 4; i++) {
                vm.activity[i].selected = false
            }
            vm.activity[index].selected = true;
            vm.survey.answerGroups[6].answerText[0] = vm.activity[index].name;
        }

        function send() {
            vm.survey.opinionId = 'firstOpinion';
            vm.survey.opinionName = '';
            vm.survey.timestamp = Date.parse(new Date());

            OpinionService.createUpdateFirstOpinion(vm.survey, function (data) {
                //$state.go('/client.office');
                vm.step = 6;
            });
        }


        function next() {
            saveDataForReload();
            switch (vm.step) {
                case 0:
                    if ((!vm.purpose[0].selected && !vm.purpose[1].selected && !vm.purpose[2].selected) || !vm.survey.answerGroups[1].answerText[0]) {
                        vm.check1 = true;
                        return;
                    }
                    break;
                case 1:
                    if (!vm.survey.answerGroups[2].answerText[0] || !vm.survey.answerGroups[3].answerText[0] || !vm.survey.answerGroups[4].answerText[0]) {
                        vm.check2 = true;
                        return;
                    }
                    break;
                case 2:
                    if (!vm.survey.answerGroups[6].answerText[0]) {
                        vm.check3 = true;
                        return;
                    }
                    break;
                case 3:
                    if (!vm.survey.answerGroups[7].answerText[0]) {
                        vm.check4 = true;
                        return
                    }
                    break;
                case 4:
                    var email = vm.survey.answerGroups[9].answerText[0];
                    var checkEmail = email.match(/.+@.+\..+/i);
                    console.log(checkEmail);
                    if (!checkEmail) {
                        vm.wrongEmail = true;
                        vm.check5 = true;
                        return;
                    }
                    if (vm.survey.answerGroups[10].answerText[0] != vm.pass) {
                        vm.wrongPass = true;
                        vm.check5 = true;
                        return;
                    }
                    if (!vm.survey.answerGroups[8].answerText[0] || !vm.survey.answerGroups[9].answerText[0] || !vm.survey.answerGroups[10].answerText[0] || !vm.survey.answerGroups[11].answerText[0]) {
                        vm.check5 = true;
                        return;
                    }
                    user.fullname = vm.survey.answerGroups[8].answerText[0];
                    user.phone = vm.survey.answerGroups[11].answerText[0];
                    user.email = vm.survey.answerGroups[9].answerText[0];
                    user.password = vm.survey.answerGroups[10].answerText[0];
                    UserService.Create(user)
                        .then(function (response) {
                            localStorageService.clearAll();
                            if (!response.success) {
                                vm.check5 = true;
                                return;
                            }
                            vm.survey.userId = response.data.data.userId;
                        });
            }
            _reset();
        }

        function _reset() {
            vm.wrongPass = false;
            vm.check1 = false;
            vm.check2 = false;
            vm.check3 = false;
            vm.check4 = false;
            vm.check5 = false;
            vm.step < 6 ? vm.step++ : vm.step;
            console.log(vm.step);
            for (var i = 0; i < vm.stepsActions.length; i++) {
                vm.stepsActions[i] = 'done'
            }
            vm.stepsActions[vm.step] = 'active';
            vm.stepBar = 'step' + (vm.step + 1);
        }

        function back() {
            vm.stepsActions[vm.step] = '';
            vm.step--;
            vm.stepsActions[vm.step] = 'active';
            vm.stepBar = 'step' + (vm.step + 1);

        }
    }
})
();
