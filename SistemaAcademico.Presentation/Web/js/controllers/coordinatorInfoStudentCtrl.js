
(function () {
    'user strict';
    app.controller('coordinatorInfoStudentCtrl', function ($scope, $filter, $routeParams, coordinatorService, authService, dateFilter) {
        var studentUserName = $routeParams.param1;
        var allScores = [];
        coordinatorService.getInfoByStudent(authService.authentication.userName, studentUserName).then(function (response) {
            $scope.coordinator = response;
            allScores = response.Info.Student.Scores;
        },
        function (err) {
        });
        $scope.filter = {
            option: 'subject'
        };

        $scope.filterByDate = function (s, e) {
            $scope.coordinator.Info.Student.Scores = $filter('searchByDate')(allScores, $scope.startDateStr, $scope.endDateStr);
        }

        $scope.filterSelected = function () {
            if ($scope.filter.option == 'subject') {
                $('#subject-filter').show('slow');
                $('#date-filter').hide('slow');
                $scope.coordinator.Info.Student.Scores = allScores;
            } else {
                $scope.searchSubject = '';
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }
    });
})();
