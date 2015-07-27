(function () {
    'use strict';

    var app = angular.module('sistemaAcademico', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }])
})();