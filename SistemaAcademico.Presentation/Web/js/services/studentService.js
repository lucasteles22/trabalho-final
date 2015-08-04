'use strict';
app.factory('studentService', ['$http', function ($http) {
    var studentServiceFactory = {};
    var serviceBase = 'http://localhost:50689/';

    var _getAllStudents = function () {
        var students = [];
        $http.get(serviceBase + 'api/students/').success(function (res) {
            angular.forEach(res, function (item) {
                students.push(item);
            });            
        });

        return students;
    }

    studentServiceFactory.getAllStudents = _getAllStudents;
    return studentServiceFactory;
}]);