angular.module('app.filters')
    .filter('dateTime', dateTimeFilter);

function dateTimeFilter() {
    return function (item) {
        if (item) {
            var date = new Date(item);
            return moment(date).format("DD/MM/YYYY HH:mm");
        } else {
            return "";
        }
    }
}