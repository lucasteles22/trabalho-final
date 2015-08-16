(function () {
    'user strict';
    app.controller('secretariesHomeCtrl', function ($scope, $filter, secretaryService, authService, dateFilter) {
        secretaryService.getAllStudents().then(function (response) {
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
