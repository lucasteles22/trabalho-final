(function () {
    'user strict';
    app.controller('studentsHomeCtrl', function ($scope, $filter, studentService, authService, dateFilter) {
        var allScores = [];
        studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
            $scope.student = response;
            allScores = response.Scores;
        },
        function (err) {
        });
        $scope.filter = {
            option: 'subject'
        };

        //Escolhe o tipo de filtro
        $scope.filterSelected = function () {
            if ($scope.filter.option == 'subject') {
                $('#subject-filter').show('slow');
                $('#date-filter').hide('slow');
                $scope.student.Scores = allScores;
            } else {
                $scope.searchSubject = '';
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }

        //Opção escolhida - filtro por data
        $scope.verifyDate = function () {
            if ($scope.startDateStr != undefined && $scope.endDateStr != undefined) {
                var startDateChoosed = new Date($scope.startDateStr);
                var endDateChoosed = new Date($scope.endDateStr);
                if (startDateChoosed <= endDateChoosed) {
                    return false;
                }
            }
            return true;
        }
        $scope.filterByDate = function (s, e) {
            if (new Date($scope.startDateStr) <= new Date($scope.endDateStr))
                $scope.student.Scores = $filter('searchByDate')(allScores, $scope.startDateStr, $scope.endDateStr);
            else
                alert("Data inicial maior que data final. Por favor, altere!");
        }
    });
})();
