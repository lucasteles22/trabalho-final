


(function () {
    'user strict';
    app.controller('coordinatorInfoCourseCtrl', function ($scope, $filter, $routeParams, coordinatorService, authService, dateFilter) {
        var courseId = $routeParams.param1;
        coordinatorService.getInfoByCourse(authService.authentication.userName, courseId).then(function (response) {
           $scope.coordinator = response;
        },
        function (err) {
        });
    });
})();
