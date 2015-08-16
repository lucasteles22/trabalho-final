(function () {
    'user strict';
    app.controller('studentsHomeCtrl', function ($scope, $filter, studentService, authService, dateFilter) {
        var allScores = [];
        studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
            $scope.student = response;
            allScores = response.Scores;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });


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
                    //console.log($scope.student[0])
                    return false;
                } else {
                    console.log('data inicial menor que final')
                }
            }
            return true;
        }
        $scope.filterByDate = function (s, e) {
            $scope.student.Scores = $filter('searchByDate')(allScores, $scope.startDateStr, $scope.endDateStr);
        }
    });

    app.directive('smallerdate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.smallerdate = function (modelValue, viewValue) {
                    return true;
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (modelValue <= scope.endDateStr) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });
    //app.directive('biggerdate', function () {
    //    return {
    //        require: 'ngModel',
    //        link: function (scope, elm, attrs, ctrl) {
    //            ctrl.$validators.biggerdate = function (modelValue, viewValue) {
    //                if (ctrl.$isEmpty(modelValue)) {
    //                    // consider empty models to be valid
    //                    return true;
    //                }

    //                if (modelValue > scope.startDateStr) {
    //                    // it is valid
    //                    return true;
    //                }

    //                // it is invalid
    //                return false;
    //            };
    //        }
    //    };
    //});

})();
