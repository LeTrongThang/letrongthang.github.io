
angular.module('app.filters')
    .filter('paymentStatus', paymentStatus);

function paymentStatus() {
    return function (item) {
        return item.cancelled ? "ORDER.PAGE.LIST.PAYMENT_STATUS_NAME.VOIDED" : (item.paid ? "ORDER.PAGE.LIST.PAYMENT_STATUS_NAME.COMPLETED" : (item.status_id
            !== 1 && item.status_id !== 10) ? "ORDER.PAGE.LIST.PAYMENT_STATUS_NAME.PREAUTHORISED" : "ORDER.PAGE.LIST.PAYMENT_STATUS_NAME.FAILED");
    }
}

