'use strict';
var app = angular.module('sistemaAcademico', ['ngRoute', 'LocalStorageModule']);
app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
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
