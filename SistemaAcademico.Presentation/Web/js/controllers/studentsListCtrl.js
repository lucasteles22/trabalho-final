'user strict';

app.controller('studentsListCtrl', function ($scope, studentService) {
    activate();
    var students = [];
    function activate () {
        var students = studentService.getAllStudents();
        console.log(students);
        $scope.students = students;
    }
});

