(function () {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', '$cookieStore', 'OpinionService'];

    function SurveyController($scope, $cookieStore, OpinionService) {
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
        vm.survey.answerGroups = [];
        var names = ["цель", "пол", "дата рождения", "рост", "вес", "активность", "телосложение", "комментарии"];
        vm.stepsNames = ['SURVEY-HEADERS.STEP1', 'SURVEY-HEADERS.STEP2', 'SURVEY-HEADERS.STEP3', 'SURVEY-HEADERS.STEP4', 'SURVEY-HEADERS.STEP5'];

        vm.stepsActions[0] = 'active';

        for (var i = 0; i < 8; i++) {
            vm.survey.answerGroups[i] = {name: names[i], answerText: ['']};
        }
        vm.survey.answerGroups[2].answerText[0] = '1993-07-03';
        vm.gender = [
            'GENDER.MALE',
            'GENDER.FEMALE'
        ];
        vm.activity = [
            'SURVEY-HEADERS.INTENS1',
            'SURVEY-HEADERS.INTENS2',
            'SURVEY-HEADERS.INTENS3'
        ];

        vm.purpose = [
            {name: 'PURPOSE.1', selected: false},
            {name: 'PURPOSE.2', selected: false},
            {name: 'PURPOSE.3', selected: false}
        ];

        vm.bodytype = [
            'BODYTYPE.1',
            'BODYTYPE.2',
            'BODYTYPE.3'
        ];
        vm.selectedGender = [false, false];
        vm.selectedBodyType = [false, false, false];
        vm.selectedActivity = [false, false, false];

        function changeGender(index) {
            vm.selectedGender = [false, false];
            vm.selectedGender[index] = true;
        }

        function changeBodyType(index) {
            vm.selectedBodyType = [false, false, false];
            vm.selectedBodyType[index] = true;
        }

        function changeActivity(index) {
            vm.selectedActivity = [false, false, false];
            vm.selectedActivity[index] = true;
        }

        function send() {
            vm.survey.opinionId = 'firstOpinion';
            vm.survey.opinionName = '';
            vm.survey.timestamp = Date.parse(new Date());
            var str = '';
            for (var i = 0; i < vm.purpose.length; i++) {
                if (vm.purpose[i].selected) {
                    str = " " + vm.purpose[i].name;
                }
                vm.survey.answerGroups[0].answerText[0] = str.trim();
            }

                vm.survey.userId = $cookieStore.get('userId');
                console.log('vm.survey', vm.survey);
                OpinionService.createUpdateFirstOpinion(vm.survey, function (data) {
                    console.log('data is: ', data);
                })

        }


        function next() {
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
