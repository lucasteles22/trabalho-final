'user strict';

app.controller('headerCtrl', function ($scope, authService) {
    $scope.authentication = authService.authentication;
});

