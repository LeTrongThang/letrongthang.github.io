



angular.module('app.filters')
    .filter('orderExtras', orderExtras);

function orderExtras() {
    return function (item) {
        if (item && item.length > 0) {
            var orderExtrasName = item[0].name || "";

            for (var x = 1; x < item.length; x++) {
                if (item[x].name) {
                    orderExtrasName += " & " + item[x].name;
                }
            }
            return orderExtrasName;
        } else {
            return ""
        }
    }
}

