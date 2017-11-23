angular.module('app.services')
    .service('authService', authService);

authService.$inject = ['$q', 'Restangular', 'appConfigs', '$localStorage'];

function authService($q, Restangular, appConfigs, $localStorage) {
    var authRest = Restangular.all(appConfigs.API.AUTH.BASE);

    return {
        login: login,
        refreshAccessToken: refreshAccessToken,
        validateAccessToken: validateAccessToken
    }

    function login(account) {
        var deferred = $q.defer();

        // authRest.all(appConfigs.API.AUTH.LOGIN).withHttpConfig({
        //     transformRequest: function (data) {
        //         var str = [];
        //         for (var p in data)
        //             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
        //         return str.join("&");
        //     }
        // }).post(account, null, {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Authorization': $localStorage.loginKey
        // })
        //     .then(function (res) {
        //         deferred.resolve(res);
        //     }, function (err) {
        //         deferred.reject(err);
        //     });
        if (account.username === "admin@admin.com" && account.password === "admin") {
            var res = { token_type: "Bearer", access_token: "adminabc123" }
            deferred.resolve(res);
        } else {
            var err = { data: { message: "Sai email hoặc mật khẩu!" } };
            deferred.reject(err);
        }
        return deferred.promise;
    }

    function validateAccessToken() {
        var deferred = $q.defer();

        authRest.all(appConfigs.API.AUTH.VALIDATE_TOKEN)
            .post()
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function refreshAccessToken() {
        var info = {
            grant_type: "refresh_token",
            refresh_token: $localStorage.refreshToken
        }
        var deferred = $q.defer();

        authRest.all(appConfigs.API.AUTH.REFRESH_TOKEN).withHttpConfig({
            transformRequest: function (data) {
                var str = [];
                for (var p in data)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            }
        }).post(info, null, {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': $localStorage.loginKey
        })
            .then(function (res) {
                deferred.resolve(res);
            }, function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

}