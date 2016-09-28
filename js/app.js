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
            'sbDateSelect'
        ])
        .run(run);

    run.$inject = ['$rootScope', '$cookieStore', '$http', '$state', '$timeout'];

    function run($rootScope, $cookieStore, $http, $state, $timeout) {
        // keep user logged in after page refresh

        $timeout(function() {
            $rootScope.currentUser = $cookieStore.get('userId') || {};
            var restrictedPage = $.inArray($state.current.url, ['/login', '/register']) === -1;
            var loggedIn = (typeof  $rootScope.currentUser === 'string');   
            if (restrictedPage && !loggedIn) {

                $state.go('/login');
            }
        });
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


        return service;

        function uploadProgram(program, callback) {
            $http.post(API_ENDPOINT + "/plandays", JSON.stringify(program))
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
        function getIventoryAutoComplete(data, callback) {
            $http.get(API_ENDPOINT + "/recipes/inventoryAutocomplete?word=" + data)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
                });
        }

        function getIngrAutoComplete(data, callback) {
            $http.get(API_ENDPOINT + "/recipes/ingredientAutocomplete?word=" + data)
                .success(function (data, status, headers, config) {
                    callback(data);
                })
                .error(function (data, status, headers, config) {
                    handleError(status);
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
            $http.get(API_ENDPOINT + "/recipes")
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

        // private functions

        function handleSuccess(res) {
            console.log('res', res);
            res.success = true;
            return res;
        }

        function handleError(res) {
            console.log('res', res);
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
//TODO: create separate config files for local, and prod dev
angular.module("api.config", [])
.constant("API_ENDPOINT", "http://api.hello-detox.com:/api");


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
            .state('/home.survey', {
                url: '/survey',
                templateUrl: base + 'pages/survey/survey.view.html',
                controller: 'SurveyController',
                controllerAs: 'vm',
                id: "survey"
            })
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
            });


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
            if ( vm.Actions.name ) {
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
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$scope'];

    function ClientController($scope) {
        var vm = this;
    }
})();
/**
 * Created by HP on 9/28/2016.
 */

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
                console.log(response);
                if (response.success) {

                    if (response.user.isFirstOpinionComplete) {
                        $state.go('/home.dashboard', {eventId: "123"});
                    }
                    else $state.go('/client.survey');
                    // $location.path('home.card-form');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        function register() {
            $state.go('/register');
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProgramController', ProgramController);

    ProgramController.$inject = ['UserService', 'ReceiptService', 'CardsService', 'ProgramsService', '$state', '$scope', '$sce', '$timeout'];

    function ProgramController(UserService, ReceiptService, CardsService, ProgramsService, $state, $scope, $sce, $timeout) {
        var vm = this;
        vm.addTime = addTime;
        vm.addDay = addDay;
        vm.trustSrc = trustSrc;
        vm.changed = changed;
        vm.onSelectCallback = onSelectCallback;
        vm.addCard = addCard;
        vm.closeModal = closeModal;
        vm.pendCard = pendCard;
        vm.changeCard = changeCard;
        vm.send = send;
        vm.cancel = cancel;
        vm.program = {};
        vm.program.days = [[]];
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
        var currentTime = 0;
        var curentDay = 0;
        var currentAct = 0;
        var option = "?size=100&from=0";

        //time picker initialisation
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.update = update;
        $scope.ismeridian = false;
        //end of initilisation

        //***  timepicker  functions  *****
        var initDay = update(0);
        vm.program.days[0] = [{time: initDay, actions: [{}]}];
        function addTime(dayIndex) {

            vm.program.days[dayIndex].push({time: update(dayIndex), actions: [{}]});
            currentTime = vm.program.days[dayIndex].length - 1;
            currentAct = 0;
        }

        function addDay() {
            var len = vm.program.days.length;
            initDay = update(len);
            vm.program.days.push([{time: initDay, actions: [{}]}]);
            currentTime = 0;
            curentDay = vm.program.days.length - 1;
            currentAct = 0;
        }


        if (!vm.program.memberId) {
            UserService.GetAll(option).then(function (respond) {
                var i = 0;
                for (var key in respond.data.data.data) {
                    vm.users.push(respond.data.data.data[key]);
                    vm.users[i].id = key;
                    i++;
                }

            });
        }


        function update(dayPlus) {
            var d = new Date(2000, 1, 1 + dayPlus);
            d.setHours(7);
            d.setMinutes(0);
            console.log(vm.program.days);
            return d;
        };

        function changed(dayIndex) {
            $timeout(function () {
                vm.program.days[dayIndex].sort(compareTime);
            }, 2000);
        };
        //*****   end of timepicker    *******

        //**** download all cards and receipts and forming of cards list ******
        ReceiptService.getAllReceipts(function (respond) {
            vm.receipts = respond.data.data;
            for (var key in respond.data.data) {

                vm.cards.push({
                    id: key,
                    name: respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1],
                    type: 'RECEIPT'
                });
                vm.cardsIndex[key] = {
                    id: key,
                    name: respond.data.data[key].name.match(/<h2>(.*?)<\/h2>/i)[1],
                    type: 'RECEIPT'
                };
            }
            ;
        });

        CardsService.getAllActions(option, function (respond) {
            vm.actions = respond.data.data;
            for (var key in respond.data.data) {

                vm.cards.push({id: key, name: respond.data.data[key].textShort, type: respond.data.data[key].cardType});
                vm.cardsIndex[key] = {
                    id: key,
                    name: respond.data.data[key].textShort,
                    type: respond.data.data[key].cardType
                };
            }
            ;

        });

        //****  end of download

        function trustSrc(src) {
            return $sce.trustAsHtml(src);
        }


        function onSelectCallback(item, timeIndex, dayIndex, actIndex) {
            item.selected = item.name;
            vm.program.days[dayIndex][timeIndex].actions[actIndex] = item;

        };

        function addCard(timeIndex, dayIndex) {
            vm.program.days[dayIndex][timeIndex].actions.push({});
            vm.modalClose = false;
            currentTime = timeIndex;
            curentDay = dayIndex;
            currentAct = vm.program.days[dayIndex][timeIndex].actions.length - 1;

        }

        function compareTime(time1, time2) {
            return time1.time - time2.time;
        }

        function closeModal() {
            vm.modalClose = true;
        }

        function pendCard(id) {
            vm.program.days[curentDay][currentTime].actions[currentAct] = vm.cardsIndex[id];
        }

        function changeCard(dayIndex, timeIndex, actIndex) {
            vm.modalClose = false;
            var currentTime = timeIndex;
            var curentDay = dayIndex;
            var currentAct = actIndex;
        }

        function send() {
            if(!vm.PlanDayCreate.memberId) {
                vm.PlanDayCreate.memberId = vm.user.memberId;
            };
            vm.PlanDayCreate.planDay = vm.program.planDay;
            var index = 0;
            for ( var i = 0; i < vm.program.days.length; i ++) {
                for ( var j = 0; j < vm.program.days[i].length; j ++) {
                    vm.PlanDayCreate.planBuckets.push({'bucketTimestamp': Date.parse(vm.program.days[i][j].time)});
                    for ( var k = 0; k < vm.program.days[i][j].actions.length; k ++ )
                    if (vm.program.days[i][j].actions[k].type == 'RECEIPT') {
                        if ( !('recipes' in vm.PlanDayCreate.planBuckets[index]) ) {
                            vm.PlanDayCreate.planBuckets[index].recipes = [];
                        }
                        vm.PlanDayCreate.planBuckets[index].recipes.push(vm.receipts[vm.program.days[i][j].actions[k].id]);
                    }
                    else {
                        if ( !('cards' in vm.PlanDayCreate.planBuckets[index])) {
                            vm.PlanDayCreate.planBuckets[index].cards = [];
                        }
                        vm.PlanDayCreate.planBuckets[index].cards.push(vm.actions[vm.program.days[i][j].actions[k].id]);
                    }
                    index ++;
                }
            }
            ProgramsService.uploadProgram(vm.PlanDayCreate, function(data){
                console.log(data);
            });

        }

        function cancel() {

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
        .filter('propsFilter', propsFilter);
    function propsFilter() {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function (item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    }
})();
/**
 * Created by Alla on 8/23/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsAddController', ReceiptsAddController);

    ReceiptsAddController.$inject = ['ReceiptService', '$state'];

    function ReceiptsAddController( ReceiptService, $state) {

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
        vm.ingredients = [];
        vm.inventory = [];
        vm.subname = "";
        vm.imgLoaded = false;
        vm.noName = false;


        //************     form ng-model    **********************

        vm.Receipt = {
            name: "",
            photo: "",
            shortDescription: "",
            timeCookMinutes: "",
            servesCoun: "",
            difficult: {val: 'EASY', translateval: 'LEVELS.EASY'},
            inventory: [""],
            dailyCalories: [
                {type: 'CALORIE', value: '', dayPercentageCount: 0, translateval: 'HEADERS.ENERGY'},
                {type: 'FAT', value: '', dayPercentageCount: 0, translateval: 'HEADERS.FAT'},
                {type: 'CARBOHYDRATE', value: '', dayPercentageCount: 0, translateval: 'HEADERS.CARB'},
                {type: 'PROTEIN', value: '', dayPercentageCount: 0, translateval: 'HEADERS.PROTEIN'}
            ],
            ingredients: [{}],
            steps: [{photos: [{id: 0}]}]
        };


        //************  initialisations   ****************

        vm.difficult = [
            {val: 'EASY', translateval: 'LEVELS.EASY'},
            {val: 'MEDIUM', translateval: 'LEVELS.MEDIUM'},
            {val: 'HARD', translateval: 'LEVELS.HARD'}
        ];
        vm.units = [
            {val: 'COUNT', translateval: 'UNITS.UNITS'},
            {val: 'TABLESPOON', translateval: 'UNITS.TABLESP'},
            {val: 'GRAM', translateval: 'UNITS.GR'},
            {val: 'TEASPOON', translateval: 'UNITS.TEASP'},
            {val: 'LITER', translateval: 'UNITS.LITER'},
            {val: 'KG', translateval: 'UNITS.KG'},
            {val: 'GLASS', translateval: 'UNITS.GLASS'}
        ];
        vm.cardTypeArr = [
            {name: 'CARD_TYPE.SELECT'},
            {name: 'CARD_TYPE.RECEIPT'},
            {name: 'CARD_TYPE.ACTIVITY'}
        ];

        vm.steps = [
            {stepNumber: 1, photos: [{id: 0}]}
        ];

        vm.Receipt.ingredients[0].unit = vm.units[0];
        //************  autocoplete  ************


        function autocompleteInvent(data) {
            ReceiptService.getIventoryAutoComplete(data, function (result) {
                vm.inventory = result.data;
            });
        }

        function autocompleteIngr(data) {
            ReceiptService.getIngrAutoComplete(data, function (result) {
                vm.ingredients = result.data;
            });
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
            backReceipt.difficult = vm.Receipt.difficult.val;
            backReceipt.inventory = vm.Receipt.inventory || "";
            backReceipt.steps = vm.steps;

            for (i = 0; i < vm.Receipt.dailyCalories.length; i++) {
                value = vm.Receipt.dailyCalories[i].value;
                type = vm.Receipt.dailyCalories[i].type;
                backReceipt.dailyCalories.push({"value": value, "type": type});
            }

            for (i = 0; i < vm.Receipt.ingredients.length; i++) {
                name = vm.Receipt.ingredients[i].name;
                value = vm.Receipt.ingredients[i].value;
                var unit = vm.Receipt.ingredients[i].unit.val;
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

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsEditController', ReceiptsEditController);

    ReceiptsEditController.$inject = [ 'ReceiptService', '$stateParams', '$state'];

    function ReceiptsEditController(ReceiptService, $stateParams, $state) {
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
        vm.addTool = addTool;
        vm.removeTool = removeTool;
        vm.addIngredient = addIngredient;
        vm.removeIngredient = removeIngredient;
        vm.Receipt = {};
        vm.noName = false;
        vm.difficult = [
            {val: 'EASY', translateval: 'LEVELS.EASY'},
            {val: 'MEDIUM', translateval: 'LEVELS.MEDIUM'},
            {val: 'HARD', translateval: 'LEVELS.HARD'}
        ];
        vm.units = [
            {val: 'COUNT', translateval: 'UNITS.UNITS'},
            {val: 'TABLESPOON', translateval: 'UNITS.TABLESP'},
            {val: 'GRAM', translateval: 'UNITS.GR'},
            {val: 'TEASPOON', translateval: 'UNITS.TEASP'},
            {val: 'LITER', translateval: 'UNITS.LITER'},
            {val: 'KG', translateval: 'UNITS.KG'},
            {val: 'GLASS', translateval: 'UNITS.GLASS'}
        ];
        var difficult = {'EASY': 'LEVELS.EASY', 'MEDIUM': 'LEVELS.MEDIUM', 'HARD': 'LEVELS.HARD'};
        var units = {
            'COUNT': 'UNITS.UNITS',
            'TABLESPOON': 'UNITS.TABLESP',
            'GRAM': 'UNITS.GR',
            'TEASPOON': 'UNITS.TEASP',
            'LITER': 'UNITS.LITER',
            'KG': 'UNITS.KG',
            'GLASS': 'UNITS.GLASS'
        };
        var translval = ['HEADERS.ENERGY', 'HEADERS.FAT', 'HEADERS.CARB', 'HEADERS.PROTEIN'];


        ReceiptService.getReceiptById($stateParams.receiptID, function (response) {
            vm.Receipt = response.data;
            if(vm.Receipt.name) {
                var header = vm.Receipt.name;
                vm.Receipt.name = header.match(/<h2>(.*?)<\/h2>/i)[1];
                vm.subname = header.match(/<span>(.*?)<\/span>/i)[1];
            }
            var difficultVal = vm.Receipt.difficult;
            vm.Receipt.difficult = {};
            vm.Receipt.difficult.val = difficultVal;
            vm.Receipt.difficult.translateval = difficult[difficultVal];
            vm.isMainPhoto = !!vm.Receipt.photo;
            if ( !vm.Receipt.dailyCalories ) {
                vm.Receipt.dailyCalories = [
                    {type: 'CALORIE', value: '', dayPercentageCount: 0, translateval: 'HEADERS.ENERGY'},
                    {type: 'FAT', value: '', dayPercentageCount: 0, translateval: 'HEADERS.FAT'},
                    {type: 'CARBOHYDRATE', value: '', dayPercentageCount: 0, translateval: 'HEADERS.CARB'},
                    {type: 'PROTEIN', value: '', dayPercentageCount: 0, translateval: 'HEADERS.PROTEIN'}
                ];
            }
            else {
                for (var i = 0; i < vm.Receipt.dailyCalories.length; i++) {
                    vm.Receipt.dailyCalories[i].translateval = translval[i];
                }
            }
            if (Array.isArray(vm.Receipt.ingredients)) {
                for (var i = 0; i < vm.Receipt.ingredients.length; i++) {

                    var unitVal = vm.Receipt.ingredients[i].unit;
                    vm.Receipt.ingredients[i].unit = {};
                    vm.Receipt.ingredients[i].unit.val = unitVal;
                    vm.Receipt.ingredients[i].unit.translateval = units[unitVal];
                }
            }

        });

        function removePrevImg(stepIndex, photoIndex) {

            if (stepIndex === undefined) {
                vm.Receipt.photo = '';
                vm.isMainPhoto = false;
            }
            else {
                console.log("vm.Receipt.steps[stepIndex].photos ",vm.Receipt.steps[stepIndex].photos);
                vm.Receipt.steps[stepIndex].photos.splice(photoIndex, 1);
            }
        }

        function autocompleteInvent(data) {
            ReceiptService.getIventoryAutoComplete(data, function (result) {
                vm.inventory = result.data;
            });
        }

        function autocompleteIngr(data) {
            ReceiptService.getIngrAutoComplete(data, function (result) {
                vm.ingredients = result.data;
            });
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
            var newImg = vm.steps[index].photos.length || 0;
            vm.steps[index].photos.push({"id": newImg});
        }

        function addStep() {
            var newStep = vm.Receipt.steps.length + 1;
            vm.Receipt.steps.push({"stepNumber": newStep, photos: [{id: 0}]});
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

        function send() {
            var photos = [];
            var title = '';
            var backReceipt = {};
            var value = 0;
            var name = "";
            var type = "";
            var dayPercentageCount = 0;

            backReceipt.dailyCalories = [];
            backReceipt.ingredients = [];
            backReceipt.steps = vm.Receipt.steps;
            console.log('vm.Receipt.name ', vm.Receipt.name);
            var i = 0;
            for (i = 0; i < vm.steps.length; i++) {
                for (var j = 0; j < vm.steps[i].photos.length; j++) {
                    if (vm.steps[i].photos[j].img) {
                        photos.push(vm.steps[i].photos[j].img);
                    }
                }
                vm.steps[i].photos = photos;
                photos = [];
                backReceipt.steps[i].photos = backReceipt.steps[i].photos.concat(vm.steps[i].photos);
                console.log('vm.steps[i].photos is: ', vm.steps[i].photos);
                console.log('backReceipt.steps[i].photos is: ', backReceipt.steps[i].photos);
            }


            title = '<h2>' + vm.Receipt.name + '</h2><span>' + vm.subname + '</span>';
            backReceipt.name = title || "";
            backReceipt.photo = vm.Receipt.photo || "";
            backReceipt.shortDescription = vm.Receipt.shortDescription || "";
            backReceipt.timeCookMinutes = vm.Receipt.timeCookMinutes || 0;
            backReceipt.servesCount = vm.Receipt.servesCount || 0;
            backReceipt.difficult = vm.Receipt.difficult.val;
            backReceipt.inventory = vm.Receipt.inventory || "";

            for (i = 0; i < vm.Receipt.dailyCalories.length; i++) {
                value = vm.Receipt.dailyCalories[i].value;
                type = vm.Receipt.dailyCalories[i].type;
                dayPercentageCount = vm.Receipt.dailyCalories[i].dayPercentageCount || 0;

                backReceipt.dailyCalories.push({"value": value, "type": type, "dayPercentageCount": dayPercentageCount});
            }

            for (i = 0; i < vm.Receipt.ingredients.length; i++) {
                name = vm.Receipt.ingredients[i].name;
                value = vm.Receipt.ingredients[i].value;
                var unit = vm.Receipt.ingredients[i].unit.val;
                backReceipt.ingredients.push({"name": name, "value": value, "unit": unit});
            }
            console.log("backReceipt is: ", backReceipt);
            if(vm.Receipt.name) {
                ReceiptService.receiptUpdate($stateParams.receiptID, backReceipt, function (response) {
                    $state.go('/receipts.list');
                });
            }
            else {
                vm.noName = true;
            }
        }

        function cancel() {
            $state.go('/receipts.list');
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReceiptsListController', ReceiptsListController);

    ReceiptsListController.$inject = ['ReceiptService', 'NgTableParams', '$state'];

    function ReceiptsListController(ReceiptService,  NgTableParams, $state) {
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
                vm.ReceiptsList[i].name = header.match(/<h2>(.*?)<\/h2>/i)[1];
                if (!vm.ReceiptsList[i].dailyCalories) {
                    vm.ReceiptsList[i].dailyCalories = [{value: 0}, {value: 0}, {value: 0}, {value: 0}];
                }

                vm.ReceiptsList[i].cal = vm.ReceiptsList[i].dailyCalories[0].value;
                if ( vm.ReceiptsList[i].dailyCalories.length > 1) {
                    vm.ReceiptsList[i].fat = vm.ReceiptsList[i].dailyCalories[1].value;
                }
                if ( vm.ReceiptsList[i].dailyCalories.length > 2) {
                    vm.ReceiptsList[i].carb = vm.ReceiptsList[i].dailyCalories[2].value;
                }
                if ( vm.ReceiptsList[i].dailyCalories.length > 3) {
                    vm.ReceiptsList[i].prot = vm.ReceiptsList[i].dailyCalories[3].value;
                }
                delete vm.ReceiptsList[i].dailyCalories;

               // console.log('vm.ReceiptsList[i].dailyCalories is: ', vm.ReceiptsList[i].dailyCalories);
                i++;
            }
            vm.tableParams = new NgTableParams({}, { dataset: vm.ReceiptsList});

        });

        function deleteReceipt(id) {
            for ( var i = 0; i < vm.ReceiptsList.length; i ++ ) {
                if ( vm.ReceiptsList[i].id == id ) {
                    vm.ReceiptsList.splice(i, 1);
                }
            }
            ReceiptService.receiptDelete(id, function(response) {
               // console.log('response is: ', response);
            });

            vm.tableParams = new NgTableParams({}, { dataset: vm.ReceiptsList});
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
        var difficult = {'EASY': 'LEVELS.EASY', 'MEDIUM': 'LEVELS.MEDIUM', 'HARD': 'LEVELS.HARD'};
        vm.titles = [ 'HEADERS.CAL', 'HEADERS.CARB', 'HEADERS.PROTEIN', 'HEADERS.FAT'];
        
        vm.units = {'COUNT': 'UNITS.UNITS', 'TABLESPOON': 'UNITS.TABLESP', 'GRAM': 'UNITS.GR', 'TEASPOON': 'UNITS.TEASP', 'LITER': 'UNITS.LITER', 'KG': 'UNITS.KG', 'GLASS': 'UNITS.GLASS'};

        vm.id = $stateParams.receiptID;
        ReceiptService.getReceiptById(vm.id, function(response) {
			console.log(response);
			vm.Receipt = response.data;
			vm.header = $sce.trustAsHtml(vm.Receipt.name);
			vm.difficult = difficult[vm.Receipt.difficult];
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
    }
})();/**
 * Created by Alla on 8/10/2016.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('viewMembersController', viewMembersController);

    viewMembersController.$inject = ['UserService', 'NgTableParams', '$state'];

    function viewMembersController(UserService, NgTableParams, $state) {
        var vm = this;
        vm.user = {};
        UserService.GetById($state.params.userId)
            .then(function(data) {
                vm.user = data.data.data;
            });
        console.log($state.params.userId);
    }
})();/**
 * Created by Alla on 8/12/2016.
 */
