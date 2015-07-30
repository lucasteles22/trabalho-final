    'use strict';

    var app = angular.module('sistemaAcademico', ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });
    }])

'user strict';

app.controller('loginCtrl', function ($scope, loginService) {
    $scope.login = function(user) {
        console.log("logincontroler");
        loginService.login(user);
    }
});


    'use strict';
    app.directive('loginDirective', function () {
        return {
            templateUrl: 'partials/tpl/login.tpl.html'
        }
    });

'use strict';

app.factory('loginService', function ($http) {
    return {
        login: function(user) {
            console.log('login service');
            console.log(user);

            var $promise = $http.post('http://localhost:50689/', user);
            $promise.then(function (msg) {
                console.log(msg);
            });
        }
    }
});

