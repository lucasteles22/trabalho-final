(function () {
    'user strict';
    app.controller('studentsListCtrl', function ($scope, studentService) {
        studentService.getAllStudents().then(function (response) {
            var students = [];
            angular.forEach(response, function (item) {
                students.push(item);
            });
            $scope.students = students;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            console.log(err)
        });
    });
})();
