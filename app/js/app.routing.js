(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $httpProvider.defaults.withCredentials = true;

        var base = 'app/';

        // This par of code responsible for
        // removing # from address line of browther
        // remove comments when it works on real server
/*
         $locationProvider.html5Mode({
         enabled: true
         //requireBase: false
         }); */

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('/home', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "home"
            })
            //nested list with children states for home
            .state('/home.dashboard', {
                url: '/dashboard',
                templateUrl: base + 'pages/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            //parent state actions
            .state('/actions', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "actions"
            })
            // nested list with children stated actions
            .state('/actions.add', {
                url: '/actions.add',
                templateUrl: base + 'pages/actions/add-action.html',
                controller: 'AddActionController',
                controllerAs: 'vm'
            })
            .state('/actions.view', {
                url: '/actions.view:actionID',
                templateUrl: base + 'pages/actions/view-action.html',
                controller: 'ViewActionController',
                controllerAs: 'vm'
            })
            .state('/actions.list', {
                url: '/actions.list',
                templateUrl: base + 'pages/actions/list-action.html',
                controller: 'ListActionController',
                controllerAs: 'vm'
            })
            .state('/actions.edit', {
                url: '/actions.edit:actionID',
                templateUrl: base + 'pages/actions/edit-action.html',
                controller: 'EditActionController',
                controllerAs: 'vm'
            })

            // nested list with custom controller
            .state('/receipts', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "actions"
            })
            .state('/receipts.add', {
                url: '/receipts.add',
                templateUrl: base + 'pages/receipts/add-receipt.html',
                controller: 'ReceiptsAddController',
                controllerAs: 'vm'
            })
            .state('/receipts.list', {
                url: '/receipts.list',
                templateUrl: base + 'pages/receipts/list-receipts.html',
                controller: 'ReceiptsListController',
                controllerAs: 'vm'
            })
            .state('/receipts.view', {
                url: '/receipts.view/:receiptID',
                templateUrl: base + 'pages/receipts/view-receipt.html',
                controller: 'ReceiptsViewController',
                controllerAs: 'vm'
            })
            .state('/receipts.edit', {
                url: '/receipts.edit/:receiptID',
                templateUrl: base + 'pages/receipts/edit-receipt.html',
                controller: 'ReceiptsEditController',
                controllerAs: 'vm'
            })

            //parents state programs
            .state('/programs', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "actions"
            })
            //nested list with children states for program
            .state('/programs.add', {
                url: '/programs.add/:userId',
                params: {
                    userId: null
                },
                templateUrl: base + 'pages/programs/add.program.html',
                controller: 'ProgramController',
                controllerAs: 'vm',
                id: "program"
            })
            // parent state for members
            .state('/members', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "actions"
            })
            // nested list with children states
            .state('/members.list', {
                url: '/members.list',
                templateUrl: base + 'pages/users/list.members.html',
                controller: 'MembersListController',
                controllerAs: 'vm',
                id: "members"
            })
            .state('/members.view', {
                url: '/members.view/:userId',
                params: {
                    userId: null
                },
                templateUrl: base + 'pages/users/view.member.html',
                controller: 'viewMembersController',
                controllerAs: 'vm',
                id: "member"
            })
            .state('/login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: base + 'pages/login/login.view.html',
                controllerAs: 'vm',
                id: "login"
            })

            .state('/register', {
                url: '/register',
                controller: 'RegisterController',
                templateUrl: base + 'pages/register/register.view.html',
                controllerAs: 'vm',
                id: "login"
            })
            .state('/client', {
                url: '',
                abstract: true,
                controller: 'ClientController',
                templateUrl: base + 'pages/client/client.view.html',
                controllerAs: 'vm',
                id: "client"
            })

            .state('/client.survey', {
                url: '/client.survey',
                controller: 'SurveyController',
                templateUrl: base + 'pages/survey/survey.view.html',
                controllerAs: 'vm',
                id: "survey"
            })

            .state('/client.office', {
                    url: '/client.office',
                    controller: 'ClientOfficeController',
                    templateUrl: base + 'pages/client/office/client.office.view.html',
                    controllerAs: 'vm',
                    id: "office"
                });


    }
})();
