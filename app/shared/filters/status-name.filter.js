angular.module('app.filters')
    .filter('statusName', statusName);

function statusName() {
    return function (item) {
        if (item) {
            switch (item) {
                case 1: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.NEW";
                }
                case 2: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.CONFIRMED";
                }
                case 3: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.AUTHORISED";
                }
                case 4: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.CANCELLED"
                }
                case 5: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.DRIVING_PICKUP"
                }
                case 6: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.ARRIVED_PICKUP"
                }
                case 7: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.DRIVING_DROPOFF"
                }
                case 8: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.ARRIVED_DROPOFF"
                }
                case 9: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.COMPLETED"
                }
                case 10: {
                    return "ORDER.PAGE.DETAIL.STATUS_NAME.CLOSED"
                }
                default: {
                    return ""
                }
            }
        } else {
            return "";
        }
    }
}