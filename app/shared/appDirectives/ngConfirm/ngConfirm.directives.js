angular.module('app.appDirectives')
    .directive('ngConfirmClick', ['$modal', '$translate', function ($modal, $filter) {
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        return {
            restrict: 'A',
            scope: {
                ngConfirmClick: '&'
            },
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    //var trans = $filter.translate;
                    var message = attrs.ngConfirmMessage;

                    var modalHtml = '<div class="popup-confirm-content text-center">';
                    modalHtml += '<div class="popup-confirm-question">';
                    modalHtml += '<span>' + message + '</span>';
                    modalHtml += '</div>';
                    modalHtml += '<div class="popup-confirm-button">';
                    modalHtml += '<button class="btn btn-success" ng-click="ok()">{{"YES"|translate}}</button>' +
                        '<button class="btn btn-danger" ng-click="cancel()">{{"NO"|translate}}</button></div>';
                    modalHtml += '</div>';

                    var modalInstance = $modal.open({
                        template: modalHtml,
                        controller: ModalInstanceCtrl,
                        size: 'dm'
                    });

                    modalInstance.result.then(function () {
                        scope.ngConfirmClick();
                    }, function () {
                    })
                })
            }
        }
    }]);