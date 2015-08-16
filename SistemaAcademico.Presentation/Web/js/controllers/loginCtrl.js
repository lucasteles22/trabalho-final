'user strict';

app.controller('loginCtrl', function ($scope, $location, authService) {
    $scope.message = "";

    $scope.login = function (user) {
        authService.login(user).then(function (response) {
            $scope.authentication = authService.authentication;
            if ($.inArray('student',  $scope.authentication.roles) > -1) {
                $location.path('/student/info');
            } else if ($.inArray('coordinator',  $scope.authentication.roles) > -1) {
                $location.path('/coordinator/info');
            } else { //secretary
                $location.path('/secretary/info');
            }
            
        },
         function (err) {
             $scope.message = err.error_description;
         });
    }
});

