(function () {
    'use strict';
    app.factory('studentService', ['$http', '$q', function ($http, $q) {
        var studentServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';

        //https://docs.angularjs.org/api/ng/service/$q
        var _getAllStudents = function () {
            var students = [];
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/students/').success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoStudent = function (userName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/students/info/?username=' + userName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        studentServiceFactory.getAllStudents = _getAllStudents;
        studentServiceFactory.getInfoStudent = _getInfoStudent;
        return studentServiceFactory;
    }]);

})();
