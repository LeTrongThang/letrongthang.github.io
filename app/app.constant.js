(function () {
    "use strict";

    angular.module('app')
        .constant('appConfigs', {
            API: {
                BASE_URL: "@@apiUrl",
                SERVER_URL: "@@serverUrl",
                USER: {
                    BASE: "user/",
                    CUSTOMER: "customer/",
                    DRIVER: "driver/"
                },
                ADMIN: {
                    BASE: "admin/",
                    ORDER: "orders/"
                },
                ORDER: {
                    BASE: "orders/",
                    CANCEL: "cancel/",
                    GET_ESTIMATION: "order-estimation/",
                },
                EXTRA_SERVICE: {
                    BASE: "extra_service/"
                },
                FEEDBACK: {
                    BASE: "feedback/"
                },
                AUTH: {
                    BASE: 'auth/',
                    LOGIN: 'login-admin/',
                    VALIDATE_TOKEN: "validate-access-token/",
                    REFRESH_TOKEN: "refresh-token/"
                },
                GLOBAL_SETTINGS: {
                    BASE: "global-settings/",
                    LOGIN_KEY: "login-key/"
                }
            },

            paginationMaxPage: 5,

            listRow: [
                { key: 20, value: '20' },
                { key: 40, value: '40' },
                { key: 60, value: '60' },
                { key: 0, value: 'All' }
            ]
        });

})();