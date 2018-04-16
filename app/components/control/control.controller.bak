(function () {
    angular.module('app.components.control')
        .controller('ControlControllerBak', ControlController);

    ControlController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', 'WatsonIoT', '$timeout'];
    function ControlController($state, $localStorage, messageShow, $timeout, WIoT, $timeout) {

        var vm = this;
        vm.manual = true;
        vm.data2 = {};
        vm.zone_1 = [];
        vm.zone_2 = [];
        vm.pumb_1 = false;
        vm.pumb_2 = false;
        vm.boiler_1 = false;
        vm.boiler_2 = false;
        vm.fan_1 = false;
        vm.fan_2 = false;
        vm.light_1 = false;
        vm.light_2 = false;
        vm.fan1Change = fan1Change;
        vm.fan2Change = fan2Change;
        vm.pumb1Change = pumb1Change;
        vm.pumb2Change = pumb2Change;
        vm.boiler1Change = boiler1Change;
        vm.boiler2Change = boiler2Change;
        vm.light1Change = light1Change;
        vm.mode1Change = mode1Change;
        vm.light2Change = light2Change;
        vm.mode2Change = mode2Change;
        vm.connected1 = false;
        vm.wait1 = false;
        vm.connected2 = false;
        vm.wait2 = false
        vm.socket = io.connect('https://hoanghuuhung.herokuapp.com/device-node');
        // vm.socket = io.connect('http://localhost:3000/device-node');
        var config = {
            "org": "8usbvc",
            "id": "myapp",
            "auth-key": "a-8usbvc-r9f4xyc9cz",
            "auth-token": "ZP(AcgR@dJ)A63c)u3",
            "type": "shared"
        }
        vm.data = {};

        function fan1Change() {
            if (!vm.wait) {
                vm.fan_1 = !vm.fan_1;
                console.log('fan1', vm.fan_1);
                vm.wait = true;
                vm.socket.emit('fan1', vm.fan_1);
            } else {
                console.log('wait...')
            }
        }
        function fan2Change() {
            if (!vm.wait) {
                vm.fan_2 = !vm.fan_2;
                console.log('fan2', vm.fan_2);
                vm.wait = true;
                vm.socket.emit('fan2', vm.fan_2);
            } else {
                console.log('wait...')
            }
        }
        function pumb1Change() {
            if (!vm.wait) {
                vm.pumb_1 = !vm.pumb_1
                console.log('pumb1', vm.pumb_1);
                vm.wait = true;
                vm.socket.emit('pumb1', vm.pumb_1);
            } else {
                console.log('wait...')
            }
        }
        function pumb2Change() {
            if (!vm.wait) {
                vm.pumb_2 = !vm.pumb_2;
                console.log('pumb2', vm.pumb_2);
                vm.wait = true;
                vm.socket.emit('pumb2', vm.pumb_2);
            } else {
                console.log('wait...')
            }
        }
        function boiler1Change() {
            if (!vm.wait) {
                vm.boiler_1 = !vm.boiler_1
                console.log('boiler1', vm.boiler_1);
                vm.wait = true;
                vm.socket.emit('boiler1', vm.boiler_1);
            } else {
                console.log('wait...')
            }
        }
        function boiler2Change() {
            if (!vm.wait) {
                vm.boiler_2 = !vm.boiler_2;
                console.log('boiler2', vm.boiler_2);
                vm.wait = true;
                vm.socket.emit('boiler2', vm.boiler_2);
            } else {
                console.log('wait...')
            }
        }
        function light1Change() {
            if (!vm.wait1) {
                vm.light_1 = !vm.light_1;
                console.log('light1', vm.light_1);
                vm.wait1 = true;
                vm.socket.emit('light1', vm.light_1);
            } else {
                console.log('wait...')
            }
        }

        function mode1Change() {
            if (!vm.wait1) {
                vm.manual_1 = !vm.manual_1;
                console.log('mode1', vm.manual_1);
                vm.wait1 = true;
                vm.socket.emit('mode1', vm.manual_1);
            } else {
                console.log('wait...')
            }
        }

        function light2Change() {
            if (!vm.wait2) {
                vm.light_2 = !vm.light_2;
                console.log('light2', vm.light_2);
                vm.wait2 = true;
                vm.socket.emit('light2', vm.light_2);
            } else {
                console.log('wait...')
            }
        }

        function mode2Change() {
            if (!vm.wait2) {
                vm.manual_2 = !vm.manual_2;
                console.log('mode1', vm.manual_2);
                vm.wait2 = true;
                vm.socket.emit('mode1', vm.manual_2);
            } else {
                console.log('wait...')
            }
        }
        vm.socket.on('deviceNodeData1', function (_data) {
            var data = _data
            vm.connected1 = true;
            vm.wait1 = false;
            $timeout(function () {
                if (data) {
                    vm.zone_1 = data.split(",")
                    if (vm.zone_1[4] === "on" || vm.zone_1[4] === "off") {
                        vm.fan_1 = vm.zone_1[3] === "on" ? true : false;
                    }
                    if (vm.zone_1[5] === "on" || vm.zone_1[5] === "off") {
                        vm.pumb_1 = vm.zone_1[4] === "on" ? true : false;
                    }
                    if (vm.zone_1[3] === "on" || vm.zone_1[3] === "off") {
                        vm.light_1 = vm.zone_1[5] === "on" ? true : false;
                    }
                    if (vm.zone_1[6] === "on" || vm.zone_1[6] === "off") {
                        vm.boiler_1 = vm.zone_1[6] === "on" ? true : false;
                    }
                    if (vm.zone_1[7] === 0 || vm.zone_1[7] === 1) {
                        vm.manual_1 = vm.zone_1[7] === 1 ? true : false;
                    }
                    console.log(vm.zone_1);
                }
            })
        })
        vm.socket.on('deviceNodeData2', function (_data) {
            var data = _data
            vm.connected2 = true;
            vm.wait2 = false;
            $timeout(function () {
                if (data) {
                    vm.zone_2 = data.split(",")
                    if (vm.zone_2[4] === "on" || vm.zone_2[4] === "off") {
                        vm.fan_2 = vm.zone_2[3] === "on" ? true : false;
                    }
                    if (vm.zone_2[5] === "on" || vm.zone_2[5] === "off") {
                        vm.pumb_2 = vm.zone_2[4] === "on" ? true : false;
                    }
                    if (vm.zone_2[3] === "on" || vm.zone_2[3] === "off") {
                        vm.light_2 = vm.zone_2[5] === "on" ? true : false;
                    }
                    if (vm.zone_2[6] === "on" || vm.zone_2[6] === "off") {
                        vm.boiler_2 = vm.zone_2[6] === "on" ? true : false;
                    }
                    if (vm.zone_2[7] === "on" || vm.zone_7[7] === "off") {
                        vm.manual_2 = vm.zone_2[7] === "on" ? true : false;
                    }
                    console.log(vm.zone_2);
                }
            })
        })
    }
})();