'use strict';

app.factory('loginService', function ($http) {
    return {
        login: function(user, e) {
            console.log('login service');
            console.log(user);
            console.log(e);
            
            user.grant_type = 'password';
            $http({
                url: 'http://localhost:50689/api/values',
                //url: 'http://localhost:50689/token',
                method: "POST",
                data: 'grant_type=password&username='+user.username+'&password='+user.password,
                
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (result) {
                console.log(result);
                // $scope.resultPost = result;
                console.log('success')
            }).error(function () {
                console.log("error");
            });

     



        }
    }
});

