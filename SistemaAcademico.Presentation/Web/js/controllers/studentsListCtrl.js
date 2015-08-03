'user strict';

app.controller('studentsListCtrl', function ($scope, $http, authService) {
    var serviceBase = 'http://localhost:50689/';
    activate();
    var students = [];

    function activate() {
        $scope.authentication = authService.authentication;
        $http.get(serviceBase + 'api/students/').success(function (res) {
            angular.forEach(res, function (item) {
                students.push(item);
            });
            $scope.students = students;
        });
    }
});

