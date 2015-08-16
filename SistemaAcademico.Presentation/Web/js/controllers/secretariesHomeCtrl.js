(function () {
    'user strict';
    app.controller('secretariesHomeCtrl', function ($scope, $filter, secretaryService, authService, dateFilter) {
        secretaryService.getAllStudents().then(function (response) {
            $scope.secretary = response;
        },
        function (err) {
        });
    });
})();
