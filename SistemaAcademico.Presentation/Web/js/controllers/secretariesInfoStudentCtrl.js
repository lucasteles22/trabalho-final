(function () {
    'user strict';
    app.controller('secretariesInfoStudentCtrl', function ($scope, $filter, $routeParams, secretaryService, authService, dateFilter) {
        var studentUserName = $routeParams.param1;
        secretaryService.getInfoStudent(studentUserName).then(function (response) {
            $scope.secretary = response;
        },
        function (err) {
        });
    });
})();
