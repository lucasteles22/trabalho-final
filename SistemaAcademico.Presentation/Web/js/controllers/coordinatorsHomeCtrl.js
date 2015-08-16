(function () {
    'user strict';
    app.controller('coordinatorsHomeCtrl', function ($scope, $filter, coordinatorService, authService, dateFilter) {
        coordinatorService.getInfoCoordinator(authService.authentication.userName).then(function (response) {
            $scope.coordinator = response;
        },
        function (err) {
        });       
    });
})();
