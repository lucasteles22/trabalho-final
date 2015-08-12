'use strict';
var app = angular.module('sistemaAcademico', ['ngRoute', 'LocalStorageModule']);
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    /* In�cio - dasativar cache e status 304 - not modified*/
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $httpProvider.defaults.useXDomain = true;
    /* Fim - dasativar cache e status 304 - not modified*/

    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    //Interceptor request
    $httpProvider.interceptors.push('authInterceptorService');

    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    }).
    when('/student/info', {
        templateUrl: 'partials/students/index.html',
        controller: 'studentsHomeCtrl'
    }).
    when('/student/info/scores', {
        templateUrl: 'partials/students/scores.html',
        controller: 'studentsScoresCtrl'
    }).
    otherwise({
        redirectTo: '/login'
    });
}])

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


'user strict';

app.controller('headerCtrl', function ($scope, $location, authService) {
    $scope.authentication = authService.authentication;

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    }
});


'user strict';

app.controller('loginCtrl', function ($scope, $location, authService) {
    $scope.message = "";

    $scope.login = function (user) {
        authService.login(user).then(function (response) {
            $scope.authentication = authService.authentication;
            $location.path('/student/info');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    }
});


(function () {
    'user strict';
    app.controller('studentsHomeCtrl', function ($scope, studentService, authService, dateFilter) {
        studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
            $scope.student = response;

        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });


        //Escolhe o tipo de filtro
        $scope.filterSelected = function () {
            if ($scope.filter.option == 'subject') {
                $('#subject-filter').show('slow');
                $('#date-filter').hide('slow');
            } else {
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }
        //Opções tipo de filtro
        $scope.filter = {
            option: 'subject'
        };

        //Opção escolhida - filtro por disciplina
        $scope.filterBySubject = function () {
            if ($scope.subjectSelected != null)
                console.log($scope.subjectSelected)

        };

        //Opção escolhida - filtro por data
        $scope.verifyDate = function () {
            if ($scope.startDateStr != undefined && $scope.endDateStr != undefined) {
                var startDateChoosed = new Date($scope.startDateStr);
                var endDateChoosed = new Date($scope.endDateStr);
                if (startDateChoosed <= endDateChoosed) {
                    console.log('post');
                    return false;
                } else {
                    console.log('data inicial menor que final')
                }
            }
            return true;
        }

        $scope.filterByDate = function () {
            //post;
        }

    });

    app.directive('smallerdate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.smallerdate = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (modelValue <= scope.endDateStr) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });
    //app.directive('biggerdate', function () {
    //    return {
    //        require: 'ngModel',
    //        link: function (scope, elm, attrs, ctrl) {
    //            ctrl.$validators.biggerdate = function (modelValue, viewValue) {
    //                if (ctrl.$isEmpty(modelValue)) {
    //                    // consider empty models to be valid
    //                    return true;
    //                }

    //                if (modelValue > scope.startDateStr) {
    //                    // it is valid
    //                    return true;
    //                }

    //                // it is invalid
    //                return false;
    //            };
    //        }
    //    };
    //});


})();

(function () {
    'user strict';
    app.controller('studentsScoresCtrl', function ($scope, studentService, authService) {
        //studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
        //    $scope.student = response;
        //},
        //function (err) {
        //    //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
        //    //usuario nao encontrado
        //    console.log(err)
        //});
    });
})();

    'use strict';
    app.directive('loginDirective', function () {
        return {
            templateUrl: 'partials/tpl/login.tpl.html'
        }
    });

(function () {
    'use strict';
    app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);
})();

'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var serviceBase = 'http://localhost:50689/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        roles: []
    };

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var deferred = $q.defer();
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            var roles = JSON.parse(response.roles);
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, roles: roles });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.roles = roles;
            deferred.resolve(response);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _logOut = function () {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.roles = [];
    };

    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.roles = authData.roles;
        }
    }
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);
(function () {
    'use strict';
    app.factory('studentService', ['$http', '$q', function ($http, $q) {
        var studentServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';

        //https://docs.angularjs.org/api/ng/service/$q
        var _getAllStudents = function () {
            var students = [];
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/students/').success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoStudent = function (userName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/students/info/?username=' + userName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        studentServiceFactory.getAllStudents = _getAllStudents;
        studentServiceFactory.getInfoStudent = _getInfoStudent;
        return studentServiceFactory;
    }]);

})();
