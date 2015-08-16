(function () {
    'use strict';
    app.factory('coordinatorService', ['$http', '$q', function ($http, $q) {
        var coordinatorServiceFactory = {};
        var serviceBase = 'http://localhost:50689/';

        //https://docs.angularjs.org/api/ng/service/$q
        var _getInfoCoordinator = function (userName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info/?username=' + userName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoByCourse = function (userName, courseId) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info-by-course/?username=' + userName + '&courseId=' + courseId).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _getInfoByStudent = function (userName, studentUserName) {
            var deferred = $q.defer();
            $http.get(serviceBase + 'api/coordinators/info-by-student/?username=' + userName + '&studentUserName=' + studentUserName).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        coordinatorServiceFactory.getInfoCoordinator = _getInfoCoordinator;
        coordinatorServiceFactory.getInfoByCourse = _getInfoByCourse;
        coordinatorServiceFactory.getInfoByStudent = _getInfoByStudent;
        return coordinatorServiceFactory;
    }]);

})();
