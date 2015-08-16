(function () {
    'user strict';
    app.controller('secretariesInfoStudentCtrl', function ($scope, $filter, $routeParams, secretaryService, authService, dateFilter) {
        var studentUserName = $routeParams.param1;
        secretaryService.getInfoStudent(studentUserName).then(function (response) {
            console.log(response)
            $scope.secretary = response;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });
    });
})();
