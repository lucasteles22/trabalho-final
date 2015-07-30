'user strict';

app.controller('loginCtrl', function ($scope, loginService) {
    $scope.login = function(user) {
        console.log("logincontroler");
        loginService.login(user);
    }
});

