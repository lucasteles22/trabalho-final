(function () {
    'user strict';
    app.controller('studentsHomeCtrl', function ($scope, studentService, authService, dateFilter) {
        studentService.getInfoStudent(authService.authentication.userName).then(function (response) {
            $scope.student = response;

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
            } else {
                $('#date-filter').show('slow');
                $('#subject-filter').hide('slow');
            }
        }
        //Opções tipo de filtro
        $scope.filter = {
            option: 'subject'
        };

        //Opção escolhida - filtro por disciplina
        $scope.filterBySubject = function () {
            if ($scope.subjectSelected != null)
                console.log($scope.subjectSelected)

        };

        //Opção escolhida - filtro por data
        $scope.verifyDate = function () {
            if ($scope.startDateStr != undefined && $scope.endDateStr != undefined) {
                var startDateChoosed = new Date($scope.startDateStr);
                var endDateChoosed = new Date($scope.endDateStr);
                if (startDateChoosed <= endDateChoosed) {
                    console.log('post');
                    return false;
                } else {
                    console.log('data inicial menor que final')
                }
            }
            return true;
        }

        $scope.filterByDate = function () {
            //post;
        }

    });

    app.directive('smallerdate', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.smallerdate = function (modelValue, viewValue) {
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
