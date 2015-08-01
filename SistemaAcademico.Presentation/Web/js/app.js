    'use strict';

    var app = angular.module('sistemaAcademico', ['ngRoute']);

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        
        
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }])


