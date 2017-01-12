(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ui.router',
            'ngCookies',
            'transl',
            'ngIntlTelInput',
            'api.config',
            'jmApp',
            'ui.bootstrap',
            "ngTouch",
            'ui.select',
            'imageupload',
            'ngTable',
            'angularUtils.directives.dirPagination',
            'sbDateSelect',
            'ngOnlyNumberApp',
            'LocalStorageModule',
            'ngRoute',
            'daterangepicker'
        ])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$state', '$timeout', '$location', 'Functions'];

    function run($rootScope, $cookieStore, $state, $timeout, $location, Functions) {

        // keep user logged in after page refresh
        $rootScope.header = false;
        $timeout(function() {
            $rootScope.currentUser = $cookieStore.get('userId') || {};
            var restrictedPage = $.inArray($state.current.url, ['/login', '/register']) === -1;
            var loggedIn = (typeof  $rootScope.currentUser === 'string');   
            if (restrictedPage && !loggedIn) {

                $state.go('/login');
            }
        });
/*
        $rootScope.$on('$locationChangeSuccess',function(evt, absNewUrl, absOldUrl) {
            console.log('success', evt, absNewUrl, absOldUrl);
        }); */
}

})();

angular.module("api.config", [])
.constant("API_ENDPOINT", "http://api.hello-detox.com:80/api");

(function () {
    'use strict';
    angular
        .module('transl', ['pascalprecht.translate'])
        .config(config);
    config.$inject = [ '$translateProvider' ];
    function config($translateProvider) {
        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/l10n/',
            suffix: '.json'
        });

        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('ru');
        $translateProvider.useSanitizeValueStrategy('escape');
    }
})();
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
         });
         */
        $urlRouterProvider.otherwise('/admin');

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
            .state('/home.admin', {
                url: '/admin',
                templateUrl: base + 'pages/admin/admin.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            //parent state actions
            .state('/actions', {
                url: '',
                //abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "actions"
            })
            // nested list with children stated actions
            .state('/actions.add', {
                url: '/actions/add',
                templateUrl: base + 'pages/actions/add-action.html',
                controller: 'AddActionController',
                controllerAs: 'vm'
            })
            .state('/actions.view', {
                url: '/actions/view:actionID',
                templateUrl: base + 'pages/actions/view-action.html',
                controller: 'ViewActionController',
                controllerAs: 'vm'
            })
            .state('/actions.list', {
                url: '/actions/list',
                templateUrl: base + 'pages/actions/list-action.html',
                controller: 'ListActionController',
                controllerAs: 'vm'
            })
            .state('/actions.edit', {
                url: '/actions/edit/:actionID',
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
                url: '/receipts/add',
                templateUrl: base + 'pages/receipts/add-receipt.html',
                controller: 'ReceiptsAddController',
                controllerAs: 'vm'
            })
            .state('/receipts.list', {
                url: '/receipts/list',
                templateUrl: base + 'pages/receipts/list-receipts.html',
                controller: 'ReceiptsListController',
                controllerAs: 'vm'
            })
            .state('/receipts.view', {
                url: '/receipts/view/:receiptID',
                templateUrl: base + 'pages/receipts/view-receipt.html',
                controller: 'ReceiptsViewController',
                controllerAs: 'vm'
            })
            .state('/receipts.edit', {
                url: '/receipts/edit/:receiptID',
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
                url: '/programs/add/:userId',
                params: {
                    userId: null
                },
                templateUrl: base + 'pages/programs/add.program.html',
                controller: 'ProgramController',
                controllerAs: 'vm',
                id: "program"
            })
            //parents state programs
            .state('/planday', {
                url: '',
                abstract: true,
                controller: 'HomeController',
                templateUrl: base + 'pages/home/home.view.html',
                controllerAs: 'vm',
                id: "planday"
            })
            //nested list with children states for program
            .state('/planday.add', {
                url: '/planday/add/:userId',
                params: {
                    userId: null
                },
                templateUrl: base + 'pages/planday/add.planday.html',
                controller: 'PlandayController',
                controllerAs: 'vm',
                id: "plandayAdd"
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
                url: '/members/list',
                templateUrl: base + 'pages/users/list.members.html',
                controller: 'MembersListController',
                controllerAs: 'vm',
                id: "members"
            })
            .state('/members.view', {
                url: '/members/view/:userId',
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

            .state('/survey', {
                url: '/survey',
                controller: 'SurveyController',
                templateUrl: base + 'pages/survey/survey.view.html',
                controllerAs: 'vm',
                id: "survey"
            })
            .state('/client.prep', {
                url: '/client/prep',
                controller: 'ClientPrepController',
                templateUrl: base + 'pages/client/prep/client.prep.view.html',
                controllerAs: 'vm',
                id: "office"
            })
            .state('/client.office', {
                url: '/client/office/:userId',
                params: {
                    userId: null
                },
                controller: 'ClientOfficeController',
                templateUrl: base + 'pages/client/office/client.office.view.html',
                controllerAs: 'vm'
                //id: {}/*,

            })
            .state('receipt', {
                parent: '/client',
                url: '/receipt',
                params: {
                    pageType: null
                },
                controller: 'ClientReceiptController',
                templateUrl: base + 'pages/client/office/pages/receipt.view.html',
                controllerAs: 'vm'
                //id: {}/*,

            })
            .state('card', {
                parent: '/client',
                url: '/card',
                params: {
                    pageType: null
                },
                controller: 'ClientCardController',
                templateUrl: base + 'pages/client/office/pages/card.view.html',
                controllerAs: 'vm'
                //id: {}/*,
            })
            .state('shopping', {
                parent: '/client',
                url: '/shopping',
                params: {
                    pageType: null
                },
                controller: 'ClientShoppingController',
                templateUrl: base + 'pages/client/office/pages/shopping.view.html',
                controllerAs: 'vm'
                //id: {}/*,
            })
        ;


    }
})();

(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$log'];

    function MainController($rootScope, $log) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //Changin classes for the tag "body" depends from different states            
            $rootScope.page = toState;
        });

        $rootScope.$on(
            '$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                if (!angular.isString(error)) {
                    error = JSON.stringify(error);
                }
                $log.error('$stateChangeError: ' + error);
            }
        );
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', 'API_ENDPOINT'];

    function AuthenticationService($http, $cookieStore, API_ENDPOINT) {
        var service = {};

        service.Login = Login;

        return service;

        function Login(user, callback) {
            $http.put(API_ENDPOINT + '/login', user)
                .then(function successCallback(response) {
                    console.log(response.data.data);
                    $cookieStore.put('userId', response.data.data.userId);
                    var answer = response.data.data;
                    answer.success = true;
                    callback(answer);
                },
                function errorCallback(response, status) {
                    console.log(response);
                    response = {success: false, message: 'LOGIN.LOGINERR'};
                    callback(response);
                });
        }

    }


})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('CardsService', CardsService);

    CardsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function CardsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.actionUpload = actionUpload;
        service.getActionById = getActionById;
        service.getAllActions = getAllActions;
        service.updateAction = updateAction;
        service.deleteAction = deleteAction;

        return service;

        function deleteAction(id, callback) {
            $http.delete(API_ENDPOINT + "/cards/"+id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function updateAction(id, action, callback) {
            $http.put(API_ENDPOINT + "/cards/"+id, JSON.stringify(action))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getAllActions(options, callback) {
            $http.get(API_ENDPOINT + "/cards"+options)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });

        }

        function actionUpload(action, callback) {
            $http.post(API_ENDPOINT + "/cards", JSON.stringify(action))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getActionById(id, callback) {
            $http.get(API_ENDPOINT + "/cards/" + id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });

        }
        function handleError(error) {
            console.log(error);
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();
/**
 * Created by Alla on 8/14/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope'];
    function FlashService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('OpinionService', OpinionService);

    OpinionService.$inject = ['$http', 'API_ENDPOINT'];
    function OpinionService($http, API_ENDPOINT) {
        var service = {};

        service.createUpdateFirstOpinion = createUpdateFirstOpinion;

        return service;

        function createUpdateFirstOpinion(data, callback) {
            $http.post( API_ENDPOINT + '/opinions/firstOpinion', JSON.stringify(data))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }
        function handleError(error) {
            if (error == 403) {
                $state.go('/login');
            }
        }

    };
})();/**
 * Created by Alla on 8/9/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProgramsService', ProgramsService);

    ProgramsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function ProgramsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.uploadProgram = uploadProgram;
        service.deleteProgram = deleteProgram;
        service.getProgram = getProgram;


        return service;

        function deleteProgram(planDayId, callback){
            $http.delete(API_ENDPOINT+ "/plandays/"+planDayId)
                .success(function (data, status, headers, config) {
                    callback(data.data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getProgram(userId, callback) {
            $http.get(API_ENDPOINT+ "/plandays?memberId="+userId+"&dayFrom=2016-10-01&dayTo=2018-12-30")
                .success(function (data, status, headers, config) {
                    callback(data.data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function uploadProgram(program, callback) {
            $http.post(API_ENDPOINT + "/plandays", JSON.stringify(program))
                .success(function (data, status, headers, config) {
                    callback(status);
                })
                .error(function (data, status, headers, config) {
                    callback(status);
                });
        }

        function handleError(error) {
            console.log(error);
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();/**
 * Created by Alla on 8/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('ReceiptService', ReceiptService);

    ReceiptService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function ReceiptService($http, API_ENDPOINT, $state) {
        var service = {};
        var receiptsList = {};

        service.imgUpload = imgUpload;
        service.receiptUpload = receiptUpload;
        service.receiptDelete = receiptDelete;
        service.getAllReceipts = getAllReceipts;
        service.getReceiptFromList = getReceiptFromList;
        service.getReceiptById = getReceiptById;
        service.receiptUpdate = receiptUpdate;
        service.getIngrAutoComplete = getIngrAutoComplete;
        service.getIventoryAutoComplete = getIventoryAutoComplete;

        return service;

        function receiptDelete(id, callback) {
            $http.delete(API_ENDPOINT + "/recipes/" + id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });

        }
        function receiptUpdate(id, receipt, callback) {
            $http.put(API_ENDPOINT + "/recipes/" + id, JSON.stringify(receipt))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }
        function getIventoryAutoComplete(data) {
            if(data === undefined) return;
            return $http.get(API_ENDPOINT + "/recipes/inventoryAutocomplete?word=" + data)
                .then(function (data, status, headers, config) {
                    //console.log('data', data.data.data);
                    return(data.data.data);
                });

        }

        function getIngrAutoComplete(data) {
            if(data === undefined)return;
           return $http.get(API_ENDPOINT + "/recipes/ingredientAutocomplete?word=" + data)
                .then(function (data, status, headers, config) {
                   //console.log(data.data.data);
                    return(data.data.data);
                });
        }

        function getReceiptById(id, callback) {
            $http.get(API_ENDPOINT + "/recipes/" + id)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getReceiptFromList(id) {
            return receiptsList[id];
        }

        function getAllReceipts(callback) {
            $http.get(API_ENDPOINT + "/recipes?size=100&from=0")
                .success(function (data, status, headers, config) {
                    receiptsList = data.data.data;
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function receiptUpload(receipt, callback) {
            $http.post(API_ENDPOINT + "/recipes", JSON.stringify(receipt))
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function imgUpload(image, callback) {
            $http({
                method: 'POST',
                url: API_ENDPOINT + "/utils/uploadImage",
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("image", image.file);
                    return formData;
                }
            })
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function handleError(error) {
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'API_ENDPOINT'];
    function UserService($http, API_ENDPOINT) {
        var service = {};

        service.GetAll = GetAll;
        service.GetMe = GetMe;
        service.GetById = GetById;
        service.Create = Create;
        service.Logout = Logout;
        service.DeleteUser = DeleteUser;

        return service;

        function GetAll(params) {
            return $http.get(API_ENDPOINT + '/users'+ params).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetMe() {
            return $http.get(API_ENDPOINT + '/users/me').then(handleSuccess, handleError);
                /*
                .success(function(data, status, headers, config){
                    console.log('data',data);
                    return data;
                })
                .error(function(data, status, headers, config){console.log('status',status)});
                */
        }

        function GetById(userId) {
            return $http.get(API_ENDPOINT + '/users/' + userId).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post(API_ENDPOINT + '/register/', JSON.stringify(user)).then(handleSuccess, handleError);
        }

        function Logout() {
            return $http.delete(API_ENDPOINT + '/logout/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function DeleteUser(user){

        }

        // private functions

        function handleSuccess(res) {
            //console.log('res', res);
            res.success = true;
            return res;
        }

        function handleError(res) {
            //console.log('res', res);
            var msg;
            switch(res.status) {
                case 452:
                    msg = 'USERS.EXISTUSER';
                    break;
                case 406:
                    msg = 'USERS.NOTACCEPTABLE';
                    break;
                default:
                    msg = 'USERS.REGISTERERR';
            }
            return {success: false, message: msg};
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('UtilsService', UtilsService);

    UtilsService.$inject = ['$http', 'API_ENDPOINT', '$state'];

    function UtilsService($http, API_ENDPOINT, $state) {
        var service = {};

        service.imgUpload = imgUpload;

        return service;

        function imgUpload(image, callback) {
            $http({
                method: 'POST',
                url: API_ENDPOINT + "/utils/uploadImage",
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("image", image.file);
                    return formData;
                }
            })
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }
        function handleError(error) {
            if (error == 403) {
                $state.go('/login');
            }
        }
    }
})();
/**
 * Created by Alla on 8/14/2016.
 */
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

                //return moment(currDate.substring(0, 4) + '-' + currDate.substring(4, 6) + '-' + currDate.substring(6, 8)).format('dddd, MMMM DD YYYY');
                return moment(Functions.formatPlanDateForMoment(item)).format('dddd, MMMM DD YYYY');
            }
        }
    }
})();

/**
 * Created by HP on 12/16/2016.
 */

(function () {
    'use strict';

    angular
        .module ('app')
        .factory ('Functions', Functions);
    Functions.$inject=['$http', 'API_ENDPOINT', '$state'];

    function Functions($http, $state) {
        var service={};
        var buttons = ['PLANDAY.COOK', 'PLANDAY.DO', 'PLANDAY.LOOK'];

        service.getUnits = getUnits;
        service.getLevel = getLevel;
        service.getDailyCalories = getDailyCalories;
        service.getReceiptName = getReceiptName;
        service.getReceiptSubName = getReceiptSubName;
        service.makeTitle = makeTitle;
        service.getTime = getTime;
        service.getCardPreview = getCardPreview;
        service.getReceiptPreview = getReceiptPreview;
        service.getDailyCaloriesForPreview = getDailyCaloriesForPreview;
        service.isObjectInArray = isObjectInArray;
        service.formatPlanDateForMoment = formatPlanDateForMoment;

        return service;

        function formatPlanDateForMoment(data){
            data += '';
           return data.substring(0, 4) + '-' + data.substring(4, 6) + '-' + data.substring(6, 8)
        }

        function isObjectInArray(arr, item, field){
            var equelIndex = false;
            if(arr.length == 0) {
                return false;
            }
            var compareResult = arr.some(function(itm, indx){
                equelIndex = indx;
                return (itm[field].toUpperCase() == item[field].toUpperCase());
            });
            if(compareResult){
                return equelIndex;
            }
            else {
                return false;
            }
        }

        function getDailyCaloriesForPreview (itm) {
            if ('dailyCalories' in itm) {
                if (itm.dailyCalories.length>0) {
                    if ('value' in itm.dailyCalories[0]) {
                        return itm.dailyCalories[0].value;
                    }
                }
            }
            else {
                return false;
            }
        }

        function getReceiptPreview (itm) {
            return {
                btn: buttons[0],
                name: service.getReceiptName (itm.name),
                text: itm.shortDescription,
                cooktime: itm.timeCookMinutes,
                calories: service.getDailyCaloriesForPreview(itm),
                img: itm.photo,
                icon: 'img/plate.png'
            };
        }

        function getCardPreview (itm) {
            if (itm.cardType == "ACTION") {
                return {
                    name: itm.textShort,
                    img: itm.titlePhoto,
                    text: itm.textLong,
                    btn: buttons[1],
                    icon: 'img/fire.png'
                };
            }
            else {
                return {
                    name: itm.textShort,
                    img: itm.titlePhoto,
                    text: itm.textLong,
                    btn: buttons[2]
                };
            }
        }


        function getTime (str) {

            var dt = new Date(str);
            var minutes=dt.getMinutes ()==0 ? dt.getMinutes ()+'0' : dt.getMinutes ();
            return dt.getHours ()+':'+minutes;
        }


        function makeTitle (name, subname) {
            if(!name) return '';
            return '<h2>'+name+'</h2><span>'+subname+'</span>';
        }

        function getReceiptSubName (header) {
            if(header.search('<span>') == -1){
                return '';
            }
            return header.match (/<span>(.*?)<\/span>/i)[1];
        }

        function getReceiptName (header) {
            if(header.search('<h2>') == -1){
                return header;
            }
            return header.match (/<h2>(.*?)<\/h2>/i)[1];
        }

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

        function getLevel () {
            return [
                'EASY',
                'MEDIUM',
                'HARD'
            ];
        }

        function getDailyCalories () {
            return [
                {type: 'CALORIE', value: '', dayPercentageCount: 0},
                {type: 'FAT', value: '', dayPercentageCount: 0},
                {type: 'CARBOHYDRATE', value: '', dayPercentageCount: 0},
                {type: 'PROTEIN', value: '', dayPercentageCount: 0}
            ];
        }
    }
})();

/**
 * Created by HP on 12/25/2016.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('PlanDaysData', PlanDaysData);
    PlanDaysData.$inject = ['Functions'];

    function PlanDaysData(Functions) {
        /*
         service.data :[0:
         ObjectmemberId: "AVgx_-Dbw90xysTpf8Ns",
         planDate: 20161228,
         todo: [
         timestamp: number,
         obj: {} //full receipt of card data
         preview: {}//parametrs only for preview receipt of card in plan day page
         ],
         1: ...
         */
        var service = {};
        service.setData = setData;
        service.getFirstDay = getFirstDay;
        service.getFirstDate = getFirstDate;
        service.getLastDay = getLastDay;
        service.getLastDate = getLastDate;
        service.getDay = getDay;
        service.getToday = getToday;
        service.getTodayPlan = getTodayPlan;
        service.setFullPageData = setFullPageData;
        service.getFullPageData = getFullPageData;
        service.setCurrentDay = setCurrentDay;
        service.getCurrentDay = getCurrentDay;
        service.getIngredients = getIngredients;
        service.getAvailableDates = getAvailableDates;
        service.getIngredientsByPeriod = getDataArrByPeriod;
        service.getMinIndexByDate = getMinIndexByDate;

        return service;

        function getMinIndexByDate(date){
            var index;
            var isDayEqualOrLess = service.data.some(function(item, indx){
                index = indx;
                return (item.planDate > date)
            });
            if(isDayEqualOrLess){
                return index;
            }
            else {
                return false;
            }

        }

        function getDataArrByPeriod(start, end){
            return service.data.slice(service.getMinIndexByDate(start),service.getMinIndexByDate(end)+1);

        }

        function getAvailableDates(){
            return {
                min: Functions.formatPlanDateForMoment(getFirstDay().plan.planDate),
                max: Functions.formatPlanDateForMoment(getLastDay().plan.planDate)
            }
        }

        function getIngredients(start, end) {
            var arr = [];
            getDataArrByPeriod(start, end).forEach(function(dayLineUp) {
                dayLineUp.todo.forEach(function(timeLineUp) {
                    if ('ingredients' in timeLineUp.obj) {
                        timeLineUp.obj.ingredients.forEach(function(inredient) {
                            var commonIndex = Functions.isObjectInArray(arr, inredient, 'name');
                            if (commonIndex === false) {
                                arr.push({
                                    value: inredient.value,
                                    name: inredient.name,
                                    unit: inredient.unit
                                });
                            }
                            else {
                               arr[commonIndex]['value'] += inredient['value'];
                            }
                        })
                    }
                })

            });
           return arr;
        }

        function getTodayPlan() {
            for (var i = 0; i < service.data.length; i ++) {
                if (service.data[i].planDate == service.getToday()) {
                    return {
                        plan: service.data[i],
                        dayNumber: i
                    };
                }
            }
        }

        function getLastDate() {
            var day = service.getLastDay();
            return day.plan.planDate;
        }

        function getFirstDate() {
            var day = service.getFirstDay();
            return day.plan.planDate;
        }

        function getToday() {
            return moment().format("YYYYMMDD");
        }

        function getCurrentDay() {
            return service.currentDay;
        }

        function setCurrentDay(day) {
            service.currentDay = day;
            //console.log('currentDay', day);
        }

        function getFullPageData() {
            return service.fullPageData;
        }

        function setFullPageData(data) {
            service.fullPageData = data;

        }

        function getLastDay() {
            return {
                plan: service.data[service.data.length - 1],
                dayNumber: service.data.length - 1
            };
        }

        function getDay(index) {
            if (index < service.data.length && index > - 1) {
                return {
                    plan: service.data[index],
                    dayNumber: index
                };
            }
            if (index >= service.data.length) {
                return getLastDay();
            }
            if (index < 0) {
                return getFirstDay()
            }

        }

        function getFirstDay() {
            return {
                plan: service.data[0],
                dayNumber: 0
            };

        }

        function setData(data) {
            service.data = data;
        }
    }
})();
/**
 * Created by HP on 12/27/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('PlanDayTransfer', PlanDayTransfer);

    PlanDayTransfer.$inject = ['$http', '$q', 'API_ENDPOINT'];

    function PlanDayTransfer($http, $q, API_ENDPOINT) {
        var service = {};
        service.modyfyFromServer = modifyFromServer;
        service.modifyToServer = modifyToServer;
        service.modifyCardsDataForLine = modifyCardsDataForLine;
        service.modifyCardsDataForPopUp = modifyCardsDataForPopUp;
        service.formatPlanDay = formatPlanDay;
        service.changeDateAndKeepTime = changeDateAndKeepTime;
        service.getAllReceiptsAndCards = getAllReceiptsAndCards;
        service.setReceipts = setReceipts;
        service.setActions = setActions;
        service.setPlan = setPlan;
        service.getPlan = getPlan;
        service.deletePlan = deletePlan;
        service.updateAction = updateAction;
        service.updateReceipts = updateReceipts;
        service.setCards = setCards;
        service.getCards = getCards;
        service.setCardsIndex = setCardsIndex;
        service.getCardsIndex = getCardsIndex;

        var recipes = {};
        var actions = {};
        var plan = [];
        var cards = null;
        var cardsIndex = null;

        return service;

        function getCardsIndex() {
            return cardsIndex;
        }

        function getCards() {
            return cards;
        }

        function setCardsIndex(data) {
            cardsIndex = data;
        }

        function setCards(data) {
            cards = data;
        }

        function updateReceipts(id, data) {
            recipes[id] = data;
        }

        function updateAction(id, data) {
            actions[id] = data;
        }

        function deletePlan() {
            plan = [];
        }

        function getPlan() {
            return plan;
        }

        function setPlan(data) {
            plan = data;
        }

        function setActions(data) {
            actions = data;
        }

        function setReceipts(data) {
            recipes = data;
        }

        function getAllReceiptsAndCards() {
            return $q.all({
                receipts: $http.get(API_ENDPOINT + "/recipes?size=100&from=0"),
                cards: $http.get(API_ENDPOINT + "/cards?size=100&from=0")
            });
        }

        function changeDateAndKeepTime(newDate, oldDate) {
            return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), oldDate.getHours(), oldDate.getMinutes());
        }

        function formatPlanDay(date) {
            var beginDay = new Date(Date.parse(date));
            var year = beginDay.getFullYear();
            var month = beginDay.getMonth() < 10 ? '0' + (beginDay.getMonth() + 1) : beginDay.getMonth() + 1;
            var day = beginDay.getDate() < 10 ? '0' + beginDay.getDate() : beginDay.getDate();
            return year + '-' + month + '-' + day;
        }

        function modifyFromServer() {

        }

        function modifyCardsDataForLine() {

            var data = Object.assign(recipes, actions);
            var arr = [];
            for (var key in data) {
                if ('cardType' in data[key]) {
                    arr.push({
                        id: key,
                        name: data[key].textShort,
                        type: data[key].cardType
                    });
                }
                else if ('name' in data[key]) {
                    arr.push({
                        id: key,
                        name: modifyName(data[key].name),
                        type: 'RECEIPT'
                    });
                }
            }
            data = null;
            return arr;
        }


        function modifyToServer(model) {
            var PlanDayCreate = {};
            PlanDayCreate.planBuckets = [];
            model.plan.forEach(function (timeLine, timeIndex) {
                PlanDayCreate.planBuckets.push({'bucketTimestamp': Date.parse(timeLine.time)});

                timeLine.actions.forEach(function (actItem) {
                    if (actItem.type == 'RECEIPT') {
                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'recipes')) {
                            PlanDayCreate.planBuckets[timeIndex].recipes = [];
                        }
                        var objInd = actItem.id;
                        PlanDayCreate.planBuckets[timeIndex].recipes.push(recipes[objInd]);
                    }
                    else if (actItem.type == 'ACTION' || actItem.type == 'RECOMMENDATION') {

                        if (isObjAndHasNoField(PlanDayCreate.planBuckets[timeIndex], 'cards')) {
                            PlanDayCreate.planBuckets[timeIndex]['cards'] = [];
                        }
                        PlanDayCreate.planBuckets[timeIndex].cards.push(actions[actItem.id]);
                    }
                }); //end of actions loop
            });//end of timeLine loop

            return PlanDayCreate.planBuckets;

            function isObjAndHasNoField(obj, field) {
                if (!(typeof obj == 'object')) {
                    return false;
                }
                if (!(field in obj)) {
                    return true;
                }
                return 2;
            }
        }

        function modifyCardsDataForPopUp() {
            var data = Object.assign(recipes, actions);
            var arr = [];
            for (var key in data) {
                if ('cardType' in data[key]) {
                    arr[key] = {
                        id: key,
                        name: data[key].textShort,
                        type: data[key].cardType
                    };
                }
                else if ('name' in data[key]) {
                    arr[key] = {
                        id: key,
                        name: modifyName(data[key].name),
                        type: 'RECEIPT'
                    };
                }

            }
            data = null;
            return arr;
        }

        function modifyName(name) {
            return (name.indexOf('<h2>') > -1) ? name.match(/<h2>(.*?)<\/h2>/i)[1] : name;
        }
    }
})();
/**
 * Created by HP on 12/22/2016.
 */

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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditActionController', EditActionController);

    EditActionController.$inject = ['UtilsService', 'CardsService', '$state', '$scope', '$sce', 'PlanDayTransfer'];

    function EditActionController(UtilsService, CardsService, $state, $scope, $sce, PlanDayTransfer) {
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
        var isLastUrlPlanDay = false;
        var goToState = {};

        $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams) {
            console.log('success', toState, toParams, fromState, fromParams);
            if(fromState.name.indexOf('planday.add') >= 0){
                isLastUrlPlanDay = true;
                goToState.path = fromState.name;
                goToState.params = fromParams;
            }

        });

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
                if(isLastUrlPlanDay){
                    PlanDayTransfer.updateAction(id, vm.Actions);
                    $state.go(goToState.path, goToState.params);
                }
                else {
                    CardsService.updateAction(id, vm.Actions, function (response) {
                        $state.go('/actions.list');
                    });
                }

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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ListActionController', ListActionController);

    ListActionController.$inject = ['NgTableParams', 'CardsService', '$state', '$scope'];

    function ListActionController(NgTableParams, CardsService, $state, $scope) {
        var vm = this;
        vm.ActionsList = [];
        var option = "?size=100&from=0";
        vm.deleteAction = deleteAction;


        CardsService.getAllActions(option, function(response) {
            var i = 0;

            for ( var key in response.data.data) {
                vm.ActionsList.push(response.data.data[key]);
                vm.ActionsList[i].id = key;
                i ++;
            }
            vm.tableParams = new NgTableParams({}, { dataset: vm.ActionsList});
        });


        function deleteAction(id) {
            for ( var i = 0; i < vm.ActionsList.length; i ++ ) {
                if ( vm.ActionsList[i].id == id ) {
                    vm.ActionsList.splice(i, 1);
                }
            }
            CardsService.deleteAction(id, function(response){
            });
            vm.tableParams = new NgTableParams({}, { dataset: vm.ActionsList});
        }
        /**
         * Created by Alla on 8/14/2016.
         */
    }
})();
/**
 * Created by HP on 1/10/2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('myCtrl', myCtrl);

    myCtrl.$inject = ['$scope', '$http'];

    function myCtrl() {
        var vm = this;
        
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewActionController', ViewActionController );

    ViewActionController .$inject = ['CardsService', '$state', '$scope', '$sce'];

    function ViewActionController (CardsService, $state, $scope, $sce) {
        var vm = this;
        vm.Action = {};
        vm.deleteAction = deleteAction;
        vm.trustSrc = trustSrc;
        vm.edit = $state.params.actionID;

        CardsService.getActionById($state.params.actionID, function(response){
            vm.Action = response.data;
            console.log('response is: ', response);
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
        /**
         * Created by Alla on 8/14/2016.
         */
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope'];

    function DashboardController($scope) {
        var vm = this;
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$scope', '$state', 'ProgramsService', 'Functions', 'PlanDaysData'];

    function ClientController($scope, $state, ProgramsService, Functions, PlanDaysData) {
        var vm = this;
        var userId = $state.params.userId;
        $scope.isPlanArrLoaded = false;
        var plans = [];
        console.log('clientCtrl userId:', userId);
        ProgramsService.getProgram(userId, function(response){
            for (var key in response.data) {
                response.data[key]['key'] = key;
                var todo = [];
                response.data[key]['planBuckets'].forEach(function (item) {
                    if(item != null){
                        if ('cards' in item) {
                            item.cards.forEach(function (itm) {
                                if(itm != null){
                                    todo.push({
                                        time: Functions.getTime(item.bucketTimestamp),
                                        preview: Functions.getCardPreview(itm),
                                        obj: itm
                                    });
                                }//end if
                            });//end forEach
                        }
                        if ('recipes' in item) {
                            item.recipes.forEach(function (itm) {
                                if( itm != null) {
                                    todo.push ({
                                        time: Functions.getTime (item.bucketTimestamp),
                                        preview: Functions.getReceiptPreview(itm),
                                        obj: itm
                                    });
                                }
                            });//end forEach
                        }
                    }

                });//end for Each
                plans.push({
                    planDate: response.data[key].planDate,
                    memberId: response.data[key].memberId,
                    todo: todo
                });
            }
            plans.sort(function(a,b){
                if(a.planDate > b.planDate) {
                    return 1;
                }
                if(a.planDate < b.planDate) {
                    return -1;
                }
                if(a.planDate == b.planDate) {
                    return 0;
                }
            });
            PlanDaysData.setData(plans);
            $scope.isPlanArrLoaded = true;
        });
    }
})();
/**
 * Created by HP on 9/28/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', '$cookieStore'];

    function HomeController($state, $cookieStore) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            $cookieStore.remove('userId');
            $state.go('/login');
        }


    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService'];

    function LoginController($state, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.user = {};


        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.user, function (response) {

                if (response.success) {

                    if (response.user.role == 'ADMIN') {
                        $state.go('/home.admin', {eventId: "123"});                    }
                    else {
                        console.log('login:',response.userId);
                        $state.go('/client.office', {"userId": response.userId});
                    }
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function register() {
            $state.go('/survey');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('PlandayController', PlandayController);

    PlandayController.$inject = ['UserService', 'ProgramsService', '$state', '$scope', '$sce', '$timeout', 'PlanDayTransfer', '$location'];

    function PlandayController(UserService, ProgramsService, $state, $scope, $sce, $timeout, PlanDayTransfer, $location) {
        var vm = this;
        vm.addTime = addTime;
        var setTm = new Date();
        var setYr = setTm.getFullYear();
        var setMon = setTm.getMonth();
        var setDy = setTm.getDate();
        var setHr = 7;
        vm.allowSave = true;
        vm.dt = new Date(setYr, setMon, setDy, setHr);
        vm.trustSrc = trustSrc;
        vm.changed = changed;
        vm.onSelectCallback = onSelectCallback;
        vm.addCard = addCard;
        vm.closeModal = closeModal;
        vm.pendCard = pendCard;
        vm.changeCard = changeCard;
        vm.deleteTimeLine = deleteTimeLine;
        vm.send = send;
        vm.cancel = cancel;
        vm.deleteCard = deleteCard;
        vm.program = {};
        vm.cards = [];
        vm.cardsIndex = [];
        vm.receipts = [];
        vm.actions = [];
        vm.PlanDayCreate = {};
        vm.PlanDayCreate.planBuckets = [];
        vm.PlanDayCreate.memberId = $state.params.userId;
        vm.showUsersList = $state.params.userId;
        vm.modalClose = true;
        vm.users = [];
        vm.user = {};
        vm.editCard = editCard;

        var currentTime = 0;
        var currentAct = 0;
        var option = "?size=100&from=0";
        var initTime = 7;

        vm.program = PlanDayTransfer.getPlan();
        PlanDayTransfer.deletePlan();
        vm.cards = PlanDayTransfer.getCards();
        vm.cardsIndex = PlanDayTransfer.getCardsIndex();



        //time picker initialisation
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.ismeridian = false;

        //end of initilisation

        //***  timepicker  functions  *****

        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        var initDay = update();
        if (!('plan' in vm.program)) {
            vm.program.plan = [];
            vm.program.plan.push({
                time: initDay,
                actions: []
            });
            PlanDayTransfer.getAllReceiptsAndCards()
                .then(function(respond) {
                    vm.receipts = respond.receipts.data.data.data;
                    vm.actions = respond.cards.data.data.data;
                    PlanDayTransfer.setReceipts(vm.receipts);
                    PlanDayTransfer.setActions(vm.actions);
                    vm.cards = PlanDayTransfer.modifyCardsDataForLine();
                    vm.cardsIndex = PlanDayTransfer.modifyCardsDataForPopUp();
                });
        }

        function addTime() {
            initTime += 2;
            vm.program.plan.push({time: update(), actions: []});
            currentTime = vm.program.plan.length - 1;
            currentAct = 0;
            console.log('vm.program.plan', vm.program.plan);
        }

        $scope.$watch(function() {
            return vm.dt;
        }, function(newVal, oldVal) {
            vm.program.plan.forEach(function(item) {
                item.time = PlanDayTransfer.changeDateAndKeepTime(vm.dt, item.time);
            })
        });

        if (! vm.program.memberId) {
            UserService.GetAll(option).then(function(respond) {
                var i = 0;
                for (var key in respond.data.data.data) {
                    vm.users.push(respond.data.data.data[key]);
                    vm.users[i].id = key;
                    i ++;
                }

            });
        }

        function editCard($event, timeInd, actInd) {
            $event.stopPropagation();
            //console.log('edit', vm.program.plan[timeInd].actions[actInd]);
            PlanDayTransfer.setPlan(vm.program);
            PlanDayTransfer.setCards(vm.cards);
            PlanDayTransfer.setCardsIndex(vm.cardsIndex);
            if (vm.program.plan[timeInd].actions[actInd].type == 'RECEIPT') {
                $state.go('/receipts.edit', {receiptID: vm.program.plan[timeInd].actions[actInd].id})
            }
            else {
                $state.go('/actions.edit', {actionID: vm.program.plan[timeInd].actions[actInd].id})
            }

        }

        function deleteCard($event, timeInd, actInd) {
            $event.stopPropagation();
            vm.program.plan[timeInd].actions.splice(actInd, 1);

        }

        function deleteTimeLine(index) {
            vm.program.plan.splice(index, 1);
        }

        function update() {
            var d = new Date(Date.parse(vm.dt));
            d.setHours(initTime);
            d.setMinutes(0);
            return d;
        }

        function changed() {
            $timeout(function() {
                vm.program.plan.sort(compareTime);
            }, 2000);
        }

        //*****   end of timepicker    *******

        if (vm.showUsersList) {
            UserService.GetById(vm.showUsersList)
                .then(function(data) {
                    vm.user = data.data.data.user;
                });
        }

        function trustSrc(src) {
            return $sce.trustAsHtml(src);
        }

        function onSelectCallback(item, timeIndex, actIndex) {
            item.selected = item.name;
            vm.program.plan[timeIndex].actions[actIndex] = item;

        }

        function addCard(timeIndex) {
            vm.program.plan[timeIndex].actions.push({});
            vm.modalClose = false;
            currentTime = timeIndex;
            currentAct = vm.program.plan[timeIndex].actions.length - 1;
        }

        function compareTime(time1, time2) {
            return time1.time - time2.time;
        }

        function closeModal() {
            vm.modalClose = true;
            cleanJuncCards();
        }

        function pendCard(id) {
            vm.program.plan[currentTime].actions[currentAct] = vm.cardsIndex[id];
            vm.modalClose = true;
        }

        function cleanJuncCards() {
            vm.program.plan.forEach(function(item, index) {
                item.actions.forEach(function(itm, idx) {
                    if (JSON.stringify(itm) == '{}') {
                        item.actions.splice(idx, 1);
                    }
                })
            })
        }

        function changeCard(timeIndex, actIndex) {
            vm.modalClose = false;
            var currentTime = timeIndex;
            var currentAct = actIndex;
        }

        function clearPlanDay() {
            var tmp = vm.PlanDayCreate.memberId;
            vm.PlanDayCreate = {};
            vm.PlanDayCreate.memberId = tmp;
            vm.PlanDayCreate.planBuckets = [];
        }

        function send() {
            vm.planErrorArr = '';
            vm.planErrorUser = '';
            vm.uploadError = '';
            vm.alreadyExistsError = '';
            vm.allowSave = true;
            vm.PlanDayCreate.planDay = PlanDayTransfer.formatPlanDay(vm.dt);

            if (! vm.PlanDayCreate.memberId) {
                vm.PlanDayCreate.memberId = vm.user.id;
            }
            var isEmptyLine = vm.program.plan.some(function(timeLine) {
                return timeLine.actions.length == 0;
            });
            if (isEmptyLine) {
                vm.allowSave = false;
                clearPlanDay();
            } else {
                vm.PlanDayCreate.planBuckets = PlanDayTransfer.modifyToServer(vm.program);
            }

            if (vm.allowSave && vm.PlanDayCreate.memberId) {

                ProgramsService.uploadProgram(vm.PlanDayCreate, function(data) {
                    clearPlanDay();
                    console.log(data);
                    var afterLoad = {
                        200: function() {
                            $state.go('/members.view', {"userId": vm.PlanDayCreate.memberId});
                        },
                        453: function() {
                            vm.alreadyExistsError = 'PROGRAM.ERROR-EXISTS';
                        },
                        455: function() {
                            vm.uploadError = 'PROGRAM.ERROR-UPLOAD'
                        }
                    };
                    afterLoad[data]();
                });
            }
            else {
                if (! vm.allowSave) {
                    vm.planErrorArr = 'PROGRAM.ERROR-ARRAY';
                }
                if (! vm.PlanDayCreate.memberId) {
                    vm.planErrorUser = 'PROGRAM.ERROR-USER'
                }
                clearPlanDay();
            }

        }

        function cancel() {
            if (vm.PlanDayCreate.memberId) {
                $state.go('/members.view', {"userId": vm.PlanDayCreate.memberId});
            }
            else {
                $state.go('/members.list');
            }

        }
    }
})();
/**
 * Created by Alla on 8/10/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsAddController', ReceiptsAddController);

    ReceiptsAddController.$inject = ['ReceiptService', '$state', 'Functions'];

    function ReceiptsAddController( ReceiptService, $state, Functions) {

        var vm = this;
        vm.edit = true;
        vm.view = false;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.send = send;
        vm.cancel = cancel;
        vm.addImg = addImg;
        vm.saveImg = saveImg;
        vm.removeImg = removeImg;
        vm.addStep = addStep;
        vm.removeStep = removeStep;
        vm.autocompleteIngr = autocompleteIngr;
        vm.autocompleteInvent = autocompleteInvent;
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.ingredients = [''];
        vm.inventory = [];
        vm.subname = "";
        vm.imgLoaded = false;
        vm.noName = false;


        //************     form ng-model    **********************
        ReceiptService.getIventoryAutoComplete('', function (result) {
            vm.inventory = result.data;
        });

        vm.Receipt = {
            name: "",
            photo: "",
            shortDescription: "",
            timeCookMinutes: "",
            servesCoun: "",
            difficult: 'EASY',
            inventory: [''],
            ingredients: [{}],
            steps: [{photos: [{id: 0}]}]
        };



        vm.Receipt['dailyCalories']= Functions.getDailyCalories ();


        //************  initialisations   ****************

        vm.difficult = Functions.getLevel ();


        vm.units = Functions.getUnits ();


        vm.steps = [
            {stepNumber: 1, photos: [{id: 0}]}
        ];

        vm.Receipt.ingredients[0].unit = vm.units[0];
        //************  autocoplete  ************


        function autocompleteInvent(data) {
            return ReceiptService.getIventoryAutoComplete(data);
        }

        function autocompleteIngr(data) {
            return ReceiptService.getIngrAutoComplete(data);
        }

        function addIngredient() {
            var newItemNo = vm.Receipt.ingredients.length;
            vm.Receipt.ingredients.push({});
        }

        function addTool() {
            var newItemNo = vm.Receipt.inventory.length;
            vm.Receipt.inventory.push("");
        }

        function removeIngredient(index) {

            vm.Receipt.ingredients.splice(index, 1);
        }

        function removeTool(index) {
            vm.Receipt.inventory.splice(index, 1);
        }

        function send() {
            var photos = [];
            var title = '';
            var backReceipt = {};
            var value = 0;
            var name = "";
            var type = "";

            backReceipt.dailyCalories = [];
            backReceipt.ingredients = [];

            var i = 0;
            for (i = 0; i < vm.steps.length; i++) {
                for (var j = 0; j < vm.steps[i].photos.length; j++) {
                    if (vm.steps[i].photos[j].img) {
                        photos.push(vm.steps[i].photos[j].img);
                    }
                }
                vm.steps[i].photos = photos;
                photos = [];
            }
            title = '<h2>' + vm.Receipt.name + '</h2><span>' + vm.subname + '</span>';
            backReceipt.name = title || "";
            backReceipt.photo = vm.Receipt.photo || "";
            backReceipt.shortDescription = vm.Receipt.shortDescription || "";
            backReceipt.timeCookMinutes = vm.Receipt.timeCookMinutes || 0;
            backReceipt.servesCount = vm.Receipt.servesCount || 0;
            backReceipt.difficult = vm.Receipt.difficult;
            backReceipt.inventory = vm.Receipt.inventory || "";
            backReceipt.steps = vm.steps;

            backReceipt.dailyCalories = vm.Receipt.dailyCalories;
/*
            for (i = 0; i < vm.Receipt.dailyCalories.length; i++) {
                value = vm.Receipt.dailyCalories[i].value;
                type = vm.Receipt.dailyCalories[i].type;
                backReceipt.dailyCalories.push({"value": value, "type": type});
            }
*/
            for (i = 0; i < vm.Receipt.ingredients.length; i++) {
                name = vm.Receipt.ingredients[i].name;
                value = vm.Receipt.ingredients[i].value;
                var unit = vm.Receipt.ingredients[i].unit;
                backReceipt.ingredients.push({"name": name, "value": value, "unit": unit});
            }

            if (vm.Receipt.name) {

                ReceiptService.receiptUpload(backReceipt, function (response) {
                    $state.go('/receipts.list');
                });
            }
            else {
                vm.noName = true;
            }
        }


        function addStep() {
            var newStep = vm.steps.length + 1;
            vm.steps.push({"stepNumber": newStep, photos: [{id: 0}]});
        }

        function removeStep(index) {
            vm.steps.splice(index, 1);
        }

        function addImg(index) {
            var newImg = vm.steps[index].photos.length;
            vm.steps[index].photos.push({"id": newImg});
        }

        function removeImg(stepIndx, imgIndx) {
            if ( stepIndx !== undefined ) {
                vm.steps[stepIndx].photos.splice(imgIndx, 1);
            }
            else {
                vm.Receipt.photo = "";
            }
        }


        function saveImg(image, stepIndex, imagIndex) {

            ReceiptService.imgUpload(image, function (response) {
                if (response.data) {
                    if (stepIndex != undefined) {
                        vm.steps[stepIndex].photos[imagIndex].img = response.data;

                    } else {
                        vm.Receipt.photo = response.data;
                        vm.imgLoaded = true;
                    }
                }
            });

        }

        function cancel() {
            $state.go('/receipts.list');
        }

    }

})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsEditController', ReceiptsEditController);

    ReceiptsEditController.$inject = ['ReceiptService', '$stateParams', '$state', 'Functions', '$scope', 'PlanDayTransfer'];

    function ReceiptsEditController(ReceiptService, $stateParams, $state, Functions, $scope, PlanDayTransfer) {
        var vm = this;

        vm.steps = [{photos: []}];
        vm.send = send;
        vm.cancel = cancel;
        vm.removePrevImg = removePrevImg;
        vm.addImg = addImg;
        vm.saveImg = saveImg;
        vm.removeImg = removeImg;
        vm.addStep = addStep;
        vm.removeStep = removeStep;
        vm.autocompleteIngr = autocompleteIngr;
        vm.autocompleteInvent = autocompleteInvent;
        vm.deleteReceipt = deleteReceipt;
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.Receipt = {};
        vm.noName = false;
        vm.id = $stateParams.receiptID;
        var isLastUrlPlanDay = false;
        var goToState = {};

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log('success', toState, toParams, fromState, fromParams);
            if (fromState.name.indexOf('planday.add') >= 0) {
                isLastUrlPlanDay = true;
                goToState.path = fromState.name;
                goToState.params = fromParams;
            }
        });

        function autocompleteInvent(data) {
            return ReceiptService.getIventoryAutoComplete(data);
        }

        $scope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl) {
            console.log('success', evt, absNewUrl, absOldUrl);
        });

        vm.units = Functions.getUnits();

        vm.difficult = Functions.getLevel();

        ReceiptService.getReceiptById($stateParams.receiptID, function(response) {
                vm.Receipt = response.data;

                if (vm.Receipt.name) {
                    vm.Receipt.name = Functions.getReceiptName(vm.Receipt.name);
                    vm.subname = Functions.getReceiptSubName(vm.Receipt.name);
                }

                vm.isMainPhoto = ! ! vm.Receipt.photo;
                if (! vm.Receipt.dailyCalories) {
                    vm.Receipt['dailyCalories'] = Functions.getDailyCalories();
                }

                if (Array.isArray(vm.Receipt.steps)) {
                    for (var i = 0; i < vm.Receipt.steps.length; i ++) {
                        vm.steps.push({photos: [{}]});
                    }

                }

            }
        );
        function deleteReceipt() {
            ReceiptService.receiptDelete($stateParams.receiptID, function(response) {
                $state.go('/receipts.list');
            });
        }

        function removePrevImg(stepIndex, photoIndex) {

            if (stepIndex === undefined) {
                vm.Receipt.photo = '';
                vm.isMainPhoto = false;
            }
            else {
                console.log("vm.Receipt.steps[stepIndex].photos ", vm.Receipt.steps[stepIndex].photos);
                vm.Receipt.steps[stepIndex].photos.splice(photoIndex, 1);
            }
        }

        function autocompleteIngr(data) {
            return ReceiptService.getIngrAutoComplete(data);
        }

        function addIngredient() {
            vm.Receipt.ingredients.push({});
        }

        function addTool() {
            vm.Receipt.inventory.push("");
        }

        function removeIngredient(index) {

            vm.Receipt.ingredients.splice(index, 1);
        }

        function removeTool(index) {
            vm.Receipt.inventory.splice(index, 1);
        }

        function addImg(index) {
            console.log('step ind', index, vm.steps[index]);
            var newImg = vm.steps[index].photos.length || 0;
            vm.steps[index].photos.push({"id": newImg});
        }

        function addStep() {
            var newStep = vm.Receipt.steps.length + 1;
            vm.Receipt.steps.push({"stepNumber": newStep, photos: ['']});
            vm.steps.push({photos: [{}]});
            console.log('steps', vm.steps);
        }

        function removeStep(index) {
            vm.Receipt.steps.splice(index, 1);
        }

        function removeImg(stepIndx, imgIndx) {
            if (stepIndx !== undefined) {
                vm.steps[stepIndx].photos.splice(imgIndx, 1);
            }
            else {
                vm.Receipt.photo = "";
            }
        }

        function saveImg(image, stepIndex, imagIndex) {

            ReceiptService.imgUpload(image, function(response) {
                if (response.data) {
                    if (stepIndex != undefined) {
                        vm.steps[stepIndex].photos[imagIndex].img = response.data;

                    } else {
                        vm.Receipt.photo = response.data;
                        vm.imgLoaded = true;
                    }
                }
            });

        }

        function send() {

            vm.Receipt.name = Functions.makeTitle(vm.Receipt.name, vm.subname);

            console.log("vm.Receipt is: ", vm.Receipt);
            if (vm.Receipt.name) {
                if(isLastUrlPlanDay){
                    PlanDayTransfer.updateAction($stateParams.receiptID, vm.Receipt);
                    $state.go(goToState.path, goToState.params);
                }
                else{
                    ReceiptService.receiptUpdate($stateParams.receiptID, vm.Receipt, function(response) {
                        $state.go('/receipts.list');
                    });
                }
            }
            else {
                vm.noName = true;
            }
        }

        function cancel() {
            $state.go('/receipts.list');
        }
    }

})
();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsListController', ReceiptsListController);

    ReceiptsListController.$inject = ['ReceiptService', 'NgTableParams', '$state'];

    function ReceiptsListController(ReceiptService, NgTableParams, $state) {
        var vm = this;
        vm.titles = [];
        vm.ReceiptsList = [];
        vm.deleteReceipt = deleteReceipt;

        ReceiptService.getAllReceipts(function (response) {
            var i = 0;
            for (var key in response.data.data) {
                vm.ReceiptsList.push(response.data.data[key]);
                vm.ReceiptsList[i].id = key;
                var header = vm.ReceiptsList[i].name;
                vm.ReceiptsList[i].name = header.indexOf('<h2>') > -1 ? header.match(/<h2>(.*?)<\/h2>/i)[1] : header;
                if (!vm.ReceiptsList[i].dailyCalories) {
                    vm.ReceiptsList[i].dailyCalories = [{value: 0}, {value: 0}, {value: 0}, {value: 0}];
                }
                if (vm.ReceiptsList[i].dailyCalories.length > 0) {
                    vm.ReceiptsList[i].cal = vm.ReceiptsList[i].dailyCalories[0].value;
                    if (vm.ReceiptsList[i].dailyCalories.length > 1) {
                        vm.ReceiptsList[i].fat = vm.ReceiptsList[i].dailyCalories[1].value;
                    }
                    if (vm.ReceiptsList[i].dailyCalories.length > 2) {
                        vm.ReceiptsList[i].carb = vm.ReceiptsList[i].dailyCalories[2].value;
                    }
                    if (vm.ReceiptsList[i].dailyCalories.length > 3) {
                        vm.ReceiptsList[i].prot = vm.ReceiptsList[i].dailyCalories[3].value;
                    }
                    delete vm.ReceiptsList[i].dailyCalories;
                }
                i++;
            }
            vm.tableParams = new NgTableParams({}, {dataset: vm.ReceiptsList});
            console.log('vm.ReceiptsList', vm.ReceiptsList);

        });

        function deleteReceipt(id) {
            for (var i = 0; i < vm.ReceiptsList.length; i++) {
                if (vm.ReceiptsList[i].id == id) {
                    vm.ReceiptsList.splice(i, 1);
                }
            }
            ReceiptService.receiptDelete(id, function (response) {
                // console.log('response is: ', response);
            });

            vm.tableParams = new NgTableParams({}, {dataset: vm.ReceiptsList});
        }


    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsViewController', ReceiptsViewController);

    ReceiptsViewController.$inject = ['$scope', 'ReceiptService', '$sce', '$stateParams'];

    function ReceiptsViewController($scope, ReceiptService, $sce, $stateParams) {
        var vm = this;
        vm.Receipt = {};
        vm.header = "";

        vm.id = $stateParams.receiptID;
        ReceiptService.getReceiptById(vm.id, function(response) {
			vm.Receipt = response.data;
			vm.header = $sce.trustAsHtml(vm.Receipt.name);
        });
        
        

    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', 'FlashService'];
    function RegisterController(UserService, $location, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;            
            UserService.Create(vm.user)
                .then(function (response) {
                     console.log("response is: ", response);
                    if (response.success) {
                        FlashService.Success('LOGIN.SUCCESS', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

    SurveyController.$inject = ['$cookieStore', 'OpinionService', '$state', 'UserService'];

    function SurveyController($cookieStore, OpinionService, $state, UserService) {
        var vm = this;
        var user = {};

        vm.send = send;
        vm.changeGender = changeGender;
        vm.changeBodyType = changeBodyType;
        vm.changeActivity = changeActivity;
        vm.changePurpose = changePurpose;
        vm.stepBar = 'step1';
        vm.step = 0;
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
        vm.survey.answerGroups = [];
        var names = ["цель", 'желаемый вес', "пол", "дата рождения", "рост", "вес", "активность", "телосложение", "имя", 'еиайл', 'пароль', 'телефон']
            .map(function (item) {
                return encodeURIComponent(item);
            });
        //names = ['purpose', 'dessired weight', 'gender', 'birthday', 'heigth', 'weight', 'activity', 'bodytype', 'name', 'email', 'password', 'phone'];

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
            {name: 'SURVEY-HEADERS.INTENS4', selected: false},
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

        function changePurpose(index){
           // vm.survey.answerGroups[0].answerText[0] = vm.purpose[index].name;
            for (var i = 0; i < 2; i++) {
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
                            console.log("response is: ", response);
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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('MembersListController', MembersListController);

    MembersListController.$inject = ['UserService', 'NgTableParams', '$state'];

    function MembersListController(UserService, NgTableParams, $state) {
        var vm = this;
        var params = '?size=100&from=0';
        vm.users = [];
        vm.viewMember = viewMember;
        vm.deleteMember = deleteMember;
        UserService.GetAll(params)
            .then(function(response){
                console.log(response);
                var i = 0;
                for ( var key in response.data.data.data) {
                    vm.users.push(response.data.data.data[key]);
                    vm.users[i].id = key;
                    i++;
                }
                vm.tableParams = new NgTableParams({}, { dataset: vm.users});
            });

        function viewMember(userId) {
            $state.go('/members.view', {"userId" : userId});
        }

        function deleteMember(userId) {

        }
    }
})();/**
 * Created by Alla on 8/10/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('viewMembersController', viewMembersController);

    viewMembersController.$inject = ['UserService', 'NgTableParams', '$state', 'ProgramsService'];

    function viewMembersController(UserService, NgTableParams, $state, ProgramsService) {
        var vm = this;
        vm.user = {};
        vm.deleteDay = deleteDay;
        UserService.GetById($state.params.userId)
            .then(function(data) {
                vm.user = data.data.data;
            });
        console.log($state.params.userId);
        function listPrograms(){
            vm.program = [];
            ProgramsService.getProgram($state.params.userId, function (response) {
                for ( var key in response.data) {
                    response.data[key]['dayId'] = key;
                    vm.program.push(response.data[key]);
                };
                vm.tableParams = new NgTableParams({}, { dataset: vm.program});
            });
        }

        listPrograms();

        function deleteDay(dayId){
            ProgramsService.deleteProgram(dayId, function(response){
                listPrograms();
            });
            //console.log('dayId', dayId);
        }
    }
})();/**
 * Created by Alla on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientOfficeController', ClientOfficeController);

    ClientOfficeController.$inject = ['$state', '$rootScope', '$scope', '$location', 'Functions', 'PlanDaysData'];
    /* ngInject */
    function ClientOfficeController($state, $rootScope, $scope, $location, Functions, PlanDaysData) {
        var vm = this;

        vm.back = back;
        vm.forward = forward;
        vm.showPage = showPage;
        vm.isToday = isToday;
        vm.isFirstDate = isFirstDate;
        vm.isLastDate = isLastDate;
        vm.dayPlan = {};
        vm.getFirstDay = getFirstDay;
        vm.getToday = getToday;
        vm.getLastDay = getLastDay;



        if(PlanDaysData.getCurrentDay() != undefined){
            vm.dayPlan = PlanDaysData.getDay(PlanDaysData.getCurrentDay());

        }

        $scope.$watch('isPlanArrLoaded', function(){
            if($scope.isPlanArrLoaded && PlanDaysData.getCurrentDay() === undefined) {
                vm.dayPlan = PlanDaysData.getTodayPlan();
                if(!vm.dayPlan){
                    vm.dayPlan = PlanDaysData.getFirstDay();
                }
            }
        });

        function getLastDay(){
            vm.dayPlan = PlanDaysData.getLastDay();
        }

        function getToday(){
            vm.dayPlan = PlanDaysData.getTodayPlan();
        }

        function getFirstDay(){
            vm.dayPlan = PlanDaysData.getFirstDay();
        }

        function isLastDate(){
            if('plan' in vm.dayPlan){
                return (vm.dayPlan.plan.planDate == PlanDaysData.getLastDate());
            }
        }

        function isFirstDate(){
            if('plan' in vm.dayPlan){
                console.log('Is First vm.dayPlan.plan.planDate', vm.dayPlan.plan.planDate);
                return (vm.dayPlan.plan.planDate == PlanDaysData.getFirstDate());
            }
        }

        function isToday(){
            if('plan' in vm.dayPlan){
                return (vm.dayPlan.plan.planDate == PlanDaysData.getToday());
            }
        }

        function showPage(object){
            PlanDaysData.setFullPageData(object);
            PlanDaysData.setCurrentDay(vm.dayPlan.dayNumber);
            if('cardType' in object){
                $state.go('card');
            }
            else {
                $state.go('receipt');
            }

        }

        function forward(){
            vm.dayPlan = PlanDaysData.getDay(vm.dayPlan.dayNumber + 1);

        }

        function back(){
            vm.dayPlan = PlanDaysData.getDay(vm.dayPlan.dayNumber - 1);

        }

        $rootScope.$on('$locationChangeSuccess', function () {
            $rootScope.actualLocation = $location.path();
        });



    }
})();
/**
 * Created by HP on 10/2/2016.
 */

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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientCardController', ClientCardController);

    ClientCardController.$inject = ['$scope', '$state', 'localStorageService', '$rootScope', 'PlanDaysData'];

    function ClientCardController($scope, $state, localStorageService, $rootScope, PlanDaysData) {
        var vm = this;

        vm.Action = PlanDaysData.getFullPageData();

        console.log('vm.Action', vm.Action);

    }
})();

/**
 * Created by HP on 12/2/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientReceiptController', ClientReceiptController);

    ClientReceiptController.$inject = ['$scope', '$state', '$sce', 'PlanDaysData'];

    function ClientReceiptController($scope, $state, $sce, PlanDaysData) {
        var vm = this;

        vm.stepPhotos = [];
        vm.increaseServ = increaseServ;
        vm.decreaseServ = decreaseServ;
        vm.receipt = PlanDaysData.getFullPageData();
        console.log('vm.receipt', vm.receipt);
        if('servesCount' in vm.receipt) {
            if(!vm.receipt.servesCount){
                vm.receipt.servesCount = 1;
            }
        }
        else{
            vm.receipt['servesCount'] = 1;
        }

        vm.inventory = vm.receipt.inventory.join(' / ');
        vm.stepsAmount = vm.receipt.steps.length;
        var ingredients = [];
        vm.header = $sce.trustAsHtml(vm.receipt.name);

        vm.receipt.ingredients.forEach(function(item){
            ingredients.push(item.value/vm.receipt.servesCount);
        });

        vm.receipt.steps.forEach(function (item) {
            vm.stepPhotos.push(item.photos.length);
        });

        function changeIngredientsAmount(){
            vm.receipt.ingredients.forEach(function(item, index) {

                item.value = ingredients[index] * vm.receipt.servesCount;
            });
        }

        function increaseServ() {
            vm.receipt.servesCount ++;
            changeIngredientsAmount();
        }

        function decreaseServ(){
            if(vm.receipt.servesCount > 1) {
                vm.receipt.servesCount --;
            }
            changeIngredientsAmount();
        }

        vm.userId = $state.params.userId;

    }
})();


/**
 * Created by HP on 12/2/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientShoppingController', ClientShoppingController);

    ClientShoppingController.$inject = ['$scope', '$state', 'PlanDaysData'];

    function ClientShoppingController($scope, $state, PlanDaysData) {
        var vm = this;
        vm.userId = $state.params.userId;
        vm.back = back;
        $scope.datePicker = {};
        $scope.datePicker.date = {startDate: null, endDate: null};
        $scope.$watch('isPlanArrLoaded', function(){
            if($scope.isPlanArrLoaded){
                vm.range = PlanDaysData.getAvailableDates();
            }
        });

        $scope.$watch('datePicker.date', function(){
            if($scope.datePicker.date.endDate && $scope.datePicker.date.startDate){
                vm.list = PlanDaysData.getIngredients(moment($scope.datePicker.date.startDate).format('YYYYMMDD'),moment($scope.datePicker.date.endDate).format('YYYYMMDD'));

            }
        });






        function back(){

        }

    }
})();
/**
 * Created by HP on 12/4/2016.
 */
