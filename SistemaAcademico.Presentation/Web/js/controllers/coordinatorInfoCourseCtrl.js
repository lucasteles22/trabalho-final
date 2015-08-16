


(function () {
    'user strict';
    app.controller('coordinatorInfoCourseCtrl', function ($scope, $filter, $routeParams, coordinatorService, authService, dateFilter) {
        var courseId = $routeParams.param1;
        coordinatorService.getInfoByCourse(authService.authentication.userName, courseId).then(function (response) {
           
            console.log(response)
            $scope.coordinator = response;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });
    });
})();
