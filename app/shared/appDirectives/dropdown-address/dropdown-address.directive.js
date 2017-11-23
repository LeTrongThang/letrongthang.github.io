(function () {
    'use strict';

    angular.module('app.directives.dropdown-address')
        .directive('dropdownAddress', dropdownAddress);

    dropdownAddress.$inject = ['$timeout', 'addressService', 'messageShow', '$rootScope'];
    function dropdownAddress($timeout, addressService, messageShow, $rootScope) {
        var directive = {
            restrict: 'EA',
            scope: {
                address: "=",
            },
            templateUrl: 'app/shared/appDirectives/dropdown-address/dropdown-address.html',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.chooseAddress = chooseAddress;
            scope.typingCounter = 0;
            scope.onKeyUpSearch = onKeyUpSearch;
            scope.searchText = "";
            scope.clearSearch = clearSearch;
            scope.isShow = false;
            var inputSearch;

            scope.$watch('address.address', function (newAddress) {
                scope.searchText = newAddress;

                if (scope.input) {
                    scope.input.searchText = newAddress;
                }
                if (inputSearch) {
                    inputSearch.searchText = newAddress;
                }
            });

            function onKeyUpSearch(self) {
                scope.input = self;
                scope.searchText = self.searchText;
                scope.typingCounter++;
                $timeout(function () {
                    if (scope.typingCounter > 0) {
                        scope.typingCounter--;
                    }
                    if (!scope.typingCounter) {
                        openDropdown()
                        searchAddress(scope.searchText);
                    }
                }, 500);
            }

            scope.onChange = function (input) {
                inputSearch = input;
                scope.searchText = input.searchText;
                $timeout(function () {
                    if (scope.typingCounter > 0) {
                        scope.typingCounter--;
                    }

                    if (!scope.typingCounter) {
                        openDropdown()
                        searchAddress(input.searchText);
                    }
                }, 500);
            }


            function chooseAddress(index) {
                scope.searchText = scope.addresses[index].description;
                if (inputSearch) {
                    inputSearch.searchText = scope.addresses[index].description;
                }
                addressService.getDetails(scope.addresses[index].place_id)
                    .then(function (res) {
                        $timeout(function () {
                            if (res && res.geometry) {
                                scope.address = {
                                    lng: res.geometry.location.lng(),
                                    lat: res.geometry.location.lat(),
                                    address: scope.addresses[index].description
                                }

                                $rootScope.$broadcast('address_change', {
                                    lng: res.geometry.location.lng(),
                                    lat: res.geometry.location.lat(),
                                    address: scope.addresses[index].description
                                })
                                
                            } else {
                                messageShow.error('Cannot load location detail');
                            }
                            closeDropdown()
                        })
                    }, function (err) {
                        messageShow.error(err);
                        closeDropdown()
                    });

            }

            function searchAddress(input) {
                if (input) {
                    addressService.searchAddress(input).then(searchAddressSuccess, searchAddressError);
                }
            }

            function searchAddressSuccess(res) {
                scope.addresses = res;
            }

            function searchAddressError(err) {
                messageShow.error(err);
                closeDropdown()
            }

            function clearSearch(e) {
                scope.address.text = "";
                scope.addresses = [];
                $timeout(function () {
                    scope.searchText = "";
                    if (inputSearch) {
                        inputSearch.searchText = "";
                    }
                })

                if (scope.input) {
                    scope.input.searchText = "";
                }
                closeDropdown()
            }

            function openDropdown() {
                $timeout(function () {
                    $(".dropdown-toggle").dropdown();
                });
            }

            function closeDropdown() {
                $timeout(function () {
                    $(".dropdown-toggle").dropdown();
                });
            }
        };
    }
})();