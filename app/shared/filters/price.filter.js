
angular.module('app.filters')
    .filter('price', price);

function price() {
    return function (item) {
        return item === "USD" ? "$":item === "EUR"?"€":"£";
    }
}

