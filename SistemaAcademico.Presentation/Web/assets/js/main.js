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
    when('/coordinator/info', {
        templateUrl: 'partials/coordinators/index.html',
        controller: 'coordinatorsHomeCtrl'
    }).
    when('/coordinator/info-by-course/:param1', {
        templateUrl: 'partials/coordinators/course.html',
        controller: 'coordinatorInfoCourseCtrl'
    }).
    when('/coordinator/info-by-student/:param1', {
        templateUrl: 'partials/coordinators/student.html',
        controller: 'coordinatorInfoStudentCtrl'
    }).
    when('/secretary/info', {
        templateUrl: 'partials/secretaries/index.html',
        controller: 'secretariesHomeCtrl'
    }).
    otherwise({
        redirectTo: '/login'
    });
}])

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);




(function () {
    'user strict';
    app.controller('coordinatorInfoCourseCtrl', function ($scope, $filter, $routeParams, coordinatorService, authService, dateFilter) {
        var courseId = $routeParams.param1;
        coordinatorService.getInfoByCourse(authService.authentication.userName, courseId).then(function (response) {
           
            console.log(response)
            $scope.coordinator = response;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });
    });
})();


(function () {
    'user strict';
    app.controller('coordinatorInfoStudentCtrl', function ($scope, $filter, $routeParams, coordinatorService, authService, dateFilter) {
        var studentUserName = $routeParams.param1;
        var allScores = [];
        coordinatorService.getInfoByStudent(authService.authentication.userName, studentUserName).then(function (response) {
            $scope.coordinator = response;
            allScores = response.Info.Student.Scores;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });
        $scope.filter = {
            option: 'subject'
        };

        $scope.filterByDate = function (s, e) {
            $scope.coordinator.Info.Student.Scores = $filter('searchByDate')(allScores, $scope.startDateStr, $scope.endDateStr);
        }

        $scope.filterSelected = function () {
            if ($scope.filter.option == 'subject') {
                $('#subject-filter').show('slow');
                $('#date-filter').hide('slow');
                $scope.coordinator.Info.Student.Scores = allScores;
            } else {
                $scope.searchSubject = '';
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }
    });
})();

(function () {
    'user strict';
    app.controller('coordinatorsHomeCtrl', function ($scope, $filter, coordinatorService, authService, dateFilter) {
        coordinatorService.getInfoCoordinator(authService.authentication.userName).then(function (response) {
            $scope.coordinator = response;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });       
    });
})();

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
            if ($.inArray('student',  $scope.authentication.roles) > -1) {
                $location.path('/student/info');
            } else if ($.inArray('coordinator',  $scope.authentication.roles) > -1) {
                $location.path('/coordinator/info');
            } else { //secretary
                $location.path('/secretary/info');
            }
            
        },
         function (err) {
             $scope.message = err.error_description;
         });
    }
});


(function () {
    'user strict';
    app.controller('secretariesHomeCtrl', function ($scope, $filter, studentService, authService, dateFilter) {

    });



})();

(function () {
    'user strict';
    app.controller('studentsHomeCtrl', function ($scope, $filter, studentService, authService, dateFilter) {
        var allScores = [];
        studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
            $scope.student = response;
            allScores = response.Scores;
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
                $scope.student.Scores = allScores;
            } else {
                $scope.searchSubject = '';
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }

        //Opção escolhida - filtro por data
        $scope.verifyDate = function () {
            if ($scope.startDateStr != undefined && $scope.endDateStr != undefined) {
                var startDateChoosed = new Date($scope.startDateStr);
                var endDateChoosed = new Date($scope.endDateStr);
                if (startDateChoosed <= endDateChoosed) {
                    //console.log($scope.student[0])
                    return false;
                } else {
                    console.log('data inicial menor que final')
                }
            }
            return true;
        }
        $scope.filterByDate = function (s, e) {
            $scope.student.Scores = $filter('searchByDate')(allScores, $scope.startDateStr, $scope.endDateStr);
        }
    });

    app.directive('smallerdate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.smallerdate = function (modelValue, viewValue) {
                    return true;
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

    'use strict';
    app.directive('loginDirective', function () {
        return {
            templateUrl: 'partials/tpl/login.tpl.html'
        }
    });

(function () {
    app.filter("searchByDate", function () {
        return function (items, start, end) {
            var arrayToReturn = [];
            for (var i = 0; i < items.length; i++) {
                var s = new Date(items[i].StartDate);
                var st = new Date(start);
                var e = new Date(end);
                s.setDate(s.getDate() + 1);
                if (s >= st && s <= e)
                    arrayToReturn.push(items[i]);
            }
            return arrayToReturn
        };
    });

})();

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
    app.factory('coordinatorService', ['$http', '$q', function ($http, $q) {
        var coordinatorServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';

        //https://docs.angularjs.org/api/ng/service/$q
        var _getInfoCoordinator = function (userName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info/?username=' + userName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoByCourse = function (userName, courseId) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info-by-course/?username=' + userName + '&courseId=' + courseId).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoByStudent = function (userName, studentUserName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info-by-student/?username=' + userName + '&studentUserName=' + studentUserName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        coordinatorServiceFactory.getInfoCoordinator = _getInfoCoordinator;
        coordinatorServiceFactory.getInfoByCourse = _getInfoByCourse;
        coordinatorServiceFactory.getInfoByStudent = _getInfoByStudent;
        return coordinatorServiceFactory;
    }]);

})();

(function () {
    'use strict';
    app.factory('studentService', ['$http', '$q', function ($http, $q) {
        var studentServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';

        //https://docs.angularjs.org/api/ng/service/$q


        var _getInfoStudent = function (userName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/students/info/?username=' + userName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        studentServiceFactory.getInfoStudent = _getInfoStudent;
        return studentServiceFactory;
    }]);

})();
