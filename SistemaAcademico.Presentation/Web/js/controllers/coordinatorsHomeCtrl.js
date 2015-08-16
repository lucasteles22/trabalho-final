(function () {
    'user strict';
    app.controller('coordinatorsHomeCtrl', function ($scope, $filter, coordinatorService, authService, dateFilter) {
        coordinatorService.getInfoCoordinator(authService.authentication.userName).then(function (response) {
            $scope.coordinator = response;
        },
        function (err) {
            //Pode-se criar uma mensagem ao usuário de erro, ou criar um ponto de log, pois será muito provável erro na API (404 ou 500).
            //usuario nao encontrado
            console.log(err)
        });       
    });
})();
