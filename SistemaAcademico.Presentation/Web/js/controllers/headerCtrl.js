'user strict';

app.controller('headerCtrl', function ($scope, $location, authService) {
    $scope.authentication = authService.authentication;

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/');
    }
});

