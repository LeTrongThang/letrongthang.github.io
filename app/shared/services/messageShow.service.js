angular.module('app.services', [])
    .factory('messageShow', MessageShow);

MessageShow.$inject = ['$filter'];
function MessageShow($filter) {
    return {
        success: function (message) {
            $.scojs_message(message, $.scojs_message.TYPE_OK);
        },
        error: function (message) {
            $.scojs_message(message, $.scojs_message.TYPE_ERROR);
        }
    }
}