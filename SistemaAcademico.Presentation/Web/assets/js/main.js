'use strict';
var app = angular.module('sistemaAcademico', ['ngRoute', 'LocalStorageModule']);
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    /* Início - dasativar cache e status 304 - not modified*/
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
    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    }).
    when('/students', {
        templateUrl: 'partials/students.html',
        controller: 'studentsListCtrl'
    }).
    otherwise({
        redirectTo: '/login'
    });
}])

//app.run(['authService', function (authService) {
//    console.log('app.run')
//    authService.fillAuthData();
//}]);

'user strict';

app.controller('headerCtrl', function ($scope, authService) {
    $scope.authentication = authService.authentication;
});


'user strict';

app.controller('loginCtrl', function ($scope, $location, authService) {
    $scope.message = "";

    $scope.login = function (user) {
        authService.login(user).then(function (response) {
            $scope.authentication = authService.authentication;
            $location.path('/students');
        },
         function (err) {
             $scope.message = err.error_description;
         });
    }
});


'user strict';

app.controller('studentsListCtrl', function ($scope, studentService) {
    activate();
    var students = [];
    function activate () {
        var students = studentService.getAllStudents();
        console.log(students);
        $scope.students = students;
    }
});


    'use strict';
    app.directive('loginDirective', function () {
        return {
            templateUrl: 'partials/tpl/login.tpl.html'
        }
    });

'use strict';
app.directive('studentsDirective', function () {
    return {
        templateUrl: 'partials/tpl/students.tpl.html'
    }
});

'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var serviceBase = 'http://localhost:50689/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        var deferred = $q.defer();
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
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
    };

    var _fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
    }
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);
'use strict';

app.factory('loginService', function ($http) {
    return {
        login: function(user, e) {
            console.log('login service');
            console.log(user);
            console.log(e);
            
            user.grant_type = 'password';
            $http({
                url: 'http://localhost:50689/api/values',
                //url: 'http://localhost:50689/token',
                method: "POST",
                data: 'grant_type=password&username='+user.username+'&password='+user.password,
                
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (result) {
                console.log(result);
                // $scope.resultPost = result;
                console.log('success')
            }).error(function () {
                console.log("error");
            });

     



        }
    }
});


'use strict';
app.factory('studentService', ['$http', function ($http) {
    var studentServiceFactory = {};
    var serviceBase = 'http://localhost:50689/';

    var _getAllStudents = function () {
        var students = [];
        $http.get(serviceBase + 'api/students/').success(function (res) {
            angular.forEach(res, function (item) {
                students.push(item);
            });            
        });

        return students;
    }

    studentServiceFactory.getAllStudents = _getAllStudents;
    return studentServiceFactory;
}]);