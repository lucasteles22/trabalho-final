(function () {
    'use strict';
    app.factory('secretaryService', ['$http', '$q', function ($http, $q) {
        var secretaryServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';
        //https://docs.angularjs.org/api/ng/service/$q

        var _getAllStudents = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/secretaries/get-all-students/').success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoStudent = function (studentUserName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/secretaries/get-info-student/?studentUserName=' + studentUserName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        secretaryServiceFactory.getAllStudents = _getAllStudents;
        secretaryServiceFactory.getInfoStudent = _getInfoStudent;
        return secretaryServiceFactory;
    }]);

})();
