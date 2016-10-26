(function () {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$cookieStore', 'OpinionService', '$state'];

    function SurveyController($cookieStore, OpinionService, $state) {
        var vm = this;

        vm.send = send;
        vm.changeGender = changeGender;
        vm.changeBodyType = changeBodyType;
        vm.changeActivity = changeActivity;
        vm.stepBar = 'step1';
        vm.step = 0;
        vm.stepsActions = [];
        vm.next = next;
        vm.back = back;
        vm.survey = {};
        vm.check1 = false;
        vm.check2 = false;
        vm.check3 = false;
        vm.check4 = false;
        vm.check5 = false;
        vm.wrongPass = false;
        vm.survey.answerGroups = [];
        var names = ["цель", 'желаемый вес', "пол", "дата рождения", "рост", "вес", "активность", "телосложение", "имя", 'еиайл', 'пароль'];
        vm.stepsNames = ['SURVEY-HEADERS.STEP1', 'SURVEY-HEADERS.STEP2', 'SURVEY-HEADERS.STEP3', 'SURVEY-HEADERS.STEP4', 'SURVEY-HEADERS.STEP5', 'SURVEY-HEADERS.STEP6'];

        vm.stepsActions[0] = 'active';

        for (var i = 0; i < names.length; i++) {
            vm.survey.answerGroups[i] = {name: names[i], answerText: ['']};
        }
        vm.survey.answerGroups[3].answerText[0] = '1993-07-03';
        vm.gender = [
            {name: 'GENDER.MALE', selected: false},
            {name: 'GENDER.FEMALE', selected: false}
        ];
        vm.activity = [
            {name: 'SURVEY-HEADERS.INTENS1', selected: false},
            {name: 'SURVEY-HEADERS.INTENS2', selected: false},
            {name: 'SURVEY-HEADERS.INTENS3', selected: false}
        ];

        vm.purpose = [
            {name: 'PURPOSE.1', selected: false},
            {name: 'PURPOSE.2', selected: false},
            {name: 'PURPOSE.3', selected: false}
        ];

        vm.bodytype = [
            {name: 'BODYTYPE.1', selected: false},
            {name: 'BODYTYPE.2', selected: false},
            {name: 'BODYTYPE.3', selected: false}
        ];


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
            for (var i = 0; i < 3; i++) {
                vm.activity[i].selected = false
            }
            vm.activity[index].selected = true;
            vm.survey.answerGroups[6].answerText[0] = vm.activity[index].name;
        }

        function send() {
            vm.survey.opinionId = 'firstOpinion';
            vm.survey.opinionName = '';
            vm.survey.timestamp = Date.parse(new Date());
            vm.survey.userId = $cookieStore.get('userId');
            //purpose
            for ( var i = 0; i < 3; i ++ ) {
                if ( vm.purpose[i].selected == true ) {
                    vm.survey.answerGroups[0].answerText[i] = vm.purpose[i].name;
                }
            }
            OpinionService.createUpdateFirstOpinion(vm.survey, function (data) {
                $state.go('/client.office');
            });
        }


        function next() {
            switch (vm.step) {
                case 0:
                    if ( (!vm.purpose[0].selected && !vm.purpose[1].selected && !vm.purpose[2].selected) || !vm.survey.answerGroups[1].answerText[0]){
                        vm.check1 = true;
                        return;
                    }
                    break;
                case 1:
                    if( !vm.survey.answerGroups[2].answerText[0] || !vm.survey.answerGroups[3].answerText[0] || !vm.survey.answerGroups[4].answerText[0])
                    { vm.check2 = true;
                        return;
                    }
                    break;
                case 2:
                    if ( !vm.survey.answerGroups[6].answerText[0] ) {
                        vm.check3 = true;
                        return;
                    }
                    break;
                case 3:
                    if ( !vm.survey.answerGroups[7].answerText[0] ) {
                        vm.check4 = true;
                        return
                    }
                    break;
                case 4:
                    if ( vm.survey.answerGroups[10].answerText[0] != vm.pass ) {
                        vm.wrongPass = true;
                        vm.check5 = true;
                        return;
                    }
                    if ( !vm.survey.answerGroups[8].answerText[0] || !vm.survey.answerGroups[9].answerText[0] || !vm.survey.answerGroups[10].answerText[0]) {
                        vm.check5 = true;
                        return;
                    }


            }
            vm.wrongPass = false;
            vm.check1 = false;
            vm.check2 = false;
            vm.check3 = false;
            vm.check4 = false;
            vm.check5 = false;
            vm.step++;
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
