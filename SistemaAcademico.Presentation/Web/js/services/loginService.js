'use strict';

app.factory('loginService', function ($http) {
    return {
        login: function(user) {
            console.log('login service');
            console.log(user);

            var $promise = $http.post('http://localhost:50689/', user);
            $promise.then(function (msg) {
                console.log(msg);
            });
        }
    }
});

