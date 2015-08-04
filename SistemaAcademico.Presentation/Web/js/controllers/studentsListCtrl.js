'user strict';

app.controller('studentsListCtrl', function ($scope, studentService) {
    $scope.students = studentService.getAllStudents();
});

