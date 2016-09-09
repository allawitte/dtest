(function () {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$scope', 'UserService', 'OpinionService'];

    function SurveyController($scope,  UserService, OpinionService) {
        var vm = this;

        vm.send = send;
        vm.changeBtn = changeBtn;
        vm.stepBar = 'step1';
        vm.step = 1;
        vm.stepsActions = [];
        vm.next = next;
        vm.back = back;

        vm.stepsActions[1] = 'active';

        //ui popup datepicker settingd
        $scope.today = today;
        $scope.clear = clear;
        $scope.toggleMin = toggleMin;
        $scope.open2 = open2;
        $scope.setDate = setDate;


        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(1910, 1, 1),
            startingDay: 1,
            showWeeks: false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];
        //end of ui popup datapicker settings

        vm.gender = [
            'GENDER.MALE',
            'GENDER.FEMALE'
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
        vm.selectedGender = [false, false];
        vm.survey = {};
        function changeBtn(index) {
            vm.selectedGender = [false, false];
            vm.selectedGender[index] = true;
        }
        function send() {
            var backsurvey = {
                opinionId: 'firstOpinion',
                opinionName: '',
                answerGroups : [],
                timestamp: new Date()
            };

            var str = '';

            for ( var i = 0; i < vm.purpose.length; i ++ ) {
                if ( vm.purpose.selected) {
                    str = " " + vm.purpose.name;
                }
                vm.survey.purpose = str.trim();
            }

            for ( var i = 0; i < vm.bodytype.length; i ++ ) {
                if ( vm.bodytype.selected) {
                    str = " " + vm.bodytype.name;
                }
                vm.survey.bodytype = str.trim();
            }


            for ( var key in vm.survey) {
                backsurvey.answerGroups.push({"name": key, "answerText":  vm.survey[key]});
            }
            UserService.GetMe(function(response){
                backsurvey.userId = response.userId;
                console.log('response is', response);
                console.log('backsurvey is: ', backsurvey);
                OpinionService.createUpdateFirstOpinion(backsurvey, function(data){
                    console.log('data is: ', data);
                })
            });

            console.log('backsurvey is: ', backsurvey);
        }


        function today() {
            $scope.dt = new Date();
        };
        $scope.today();

        function clear() {
            $scope.dt = null;
        };



        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        function toggleMin() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        function open2() {
            $scope.popup2.opened = true;
        };

        function setDate(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };



        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        function next() {
            vm.step ++;
            for ( var i = 1; i < vm.stepsActions.length; i ++ ) {
                vm.stepsActions[i] = 'done'
            }
            vm.stepsActions[vm.step] = 'active';
            vm.stepBar = 'step' + vm.step;
        }

        function back() {
            vm.stepsActions[vm.step]= '';
            vm.step --;
            vm.stepsActions[vm.step]= 'active';
            vm.stepBar = 'step' + vm.step;

        }
    }
})();
