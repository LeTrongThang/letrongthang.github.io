(function () {
    angular.module('app.components.control')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', '$timeout'];
    function ControlController($state, $localStorage, messageShow, $timeout) {

        var vm = this;
        vm.manual_1 = false;
        vm.manual_2 = false;
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
        vm.wait2 = false;
        vm.listType = [];
        var topicPublish1 = "control1";
        var topicPublish2 = "control2";
        // var client = new Paho.MQTT.Client("host", port, "client_id");
        var client = new Paho.MQTT.Client("m20.cloudmqtt.com", 32733, "web_" + parseInt(Math.random() * 100, 10));
        var client2 = new Paho.MQTT.Client("m20.cloudmqtt.com", 32666, "web_" + parseInt(Math.random() * 100, 10));
        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client2.onConnectionLost = onConnectionLost2;
        client2.onMessageArrived = onMessageArrived2;
        vm.zone1 = {
            id: 1
        };
        vm.zone2 = {
            id: 2
        }
        vm.send = send;
        var options = {
            useSSL: true,
            userName: "ctcjmuyy",
            password: "NFFKErc6QcQt",
            onSuccess: onConnect,
            onFailure: doFail
        }
        var options2 = {
            useSSL: true,
            userName: "imhjhfju",
            password: "WnoHeNJQQZjI",
            onSuccess: onConnect2,
            onFailure: doFail2
        }

        // connect the client
        client.connect(options);
        client2.connect(options2);

        // called when the client connects
        function onConnect() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect");
            client.subscribe("event1");
            $timeout(function () {
                vm.connected1 = true;
                vm.wait1 = false;
            });
        }

        function onConnect2() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect2");
            client2.subscribe("event2");
            $timeout(function () {
                vm.connected2 = true;
                vm.wait2 = false;
            });
        }

        function doFail(e) {
            console.log(e);
        }
        function doFail2(e) {
            console.log(e);
        }



        function sendMessage(destination, message) {
            var message = new Paho.MQTT.Message(message);
            message.destinationName = destination;
            client.send(message);
        }

        function sendMessage2(destination, message) {
            var message = new Paho.MQTT.Message(message);
            message.destinationName = destination;
            client2.send(message);
        }

        // called when the client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }
        function onConnectionLost2(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost2:" + responseObject.errorMessage);
            }
        }

        // called when a message arrives
        function onMessageArrived(message) {
            console.log("onMessageArrived:" + message.payloadString);
            if (message.destinationName == "event1") {
                var data = message.payloadString;
                vm.connected1 = true;
                vm.wait1 = false;
                console.log(message.destinationName);
                $timeout(function () {
                    if (data && data != "ESP_reconnected") {
                        vm.zone_1 = data.split(",")
                        if (vm.zone_1[4] === "on" || vm.zone_1[4] === "off") {
                            vm.fan_1 = vm.zone_1[4] === "on" ? true : false;
                        }
                        if (vm.zone_1[5] === "on" || vm.zone_1[5] === "off") {
                            vm.pumb_1 = vm.zone_1[5] === "on" ? true : false;
                        }
                        if (vm.zone_1[3] === "on" || vm.zone_1[3] === "off") {
                            vm.light_1 = vm.zone_1[3] === "on" ? true : false;
                        }
                        if (vm.zone_1[6] === "on" || vm.zone_1[6] === "off") {
                            vm.boiler_1 = vm.zone_1[6] === "on" ? true : false;
                        }
                        if (vm.zone_1[7] == 0 || vm.zone_1[7] == 1) {
                            vm.manual_1 = vm.zone_1[7] == 1 ? true : false;
                        }
                        console.log(vm.zone_1);
                    }
                })
            }
        }

        function onMessageArrived2(message) {
            console.log("onMessageArrived2:" + message.payloadString);
            if (message.destinationName == "event2") {
                var data = message.payloadString;
                vm.connected2 = true;
                vm.wait2 = false;
                $timeout(function () {
                    if (data && data != "ESP_reconnected") {
                        vm.zone_2 = data.split(",")
                        if (vm.zone_2[4] === "on" || vm.zone_2[4] === "off") {
                            vm.fan_2 = vm.zone_2[4] === "on" ? true : false;
                        }
                        if (vm.zone_2[5] === "on" || vm.zone_2[5] === "off") {
                            vm.pumb_2 = vm.zone_2[5] === "on" ? true : false;
                        }
                        if (vm.zone_2[3] === "on" || vm.zone_2[3] === "off") {
                            vm.light_2 = vm.zone_2[3] === "on" ? true : false;
                        }
                        if (vm.zone_2[6] === "on" || vm.zone_2[6] === "off") {
                            vm.boiler_2 = vm.zone_2[6] === "on" ? true : false;
                        }
                        if (vm.zone_2[7] == 1 || vm.zone_7[7] == 0) {
                            vm.manual_2 = vm.zone_2[7] == 1 ? true : false;
                        }
                        console.log(vm.zone_2);
                    }
                })
            }
        }

        function fan1Change() {
            if (!vm.wait1) {
                vm.fan_1 = !vm.fan_1;
                console.log('fan1', vm.fan_1);
                vm.wait1 = true;
                var msg = vm.fan_1 ? "of1" : "ff1";
                sendMessage(topicPublish1, msg);
            } else {
                console.log('wait...')
            }
        }
        function fan2Change() {
            if (!vm.wait2) {
                vm.fan_2 = !vm.fan_2;
                console.log('fan2', vm.fan_2);
                vm.wait2 = true;
                var msg = vm.fan_2 ? "of2" : "ff2";
                sendMessage2(topicPublish2, msg);
            } else {
                console.log('wait...')
            }
        }
        function pumb1Change() {
            if (!vm.wait1) {
                vm.pumb_1 = !vm.pumb_1
                console.log('pumb1', vm.pumb_1);
                vm.wait1 = true;
                var msg = vm.pumb_1 ? "op1" : "fp1";
                sendMessage(topicPublish1, msg);
            } else {
                console.log('wait...')
            }
        }
        function pumb2Change() {
            if (!vm.wait2) {
                vm.pumb_2 = !vm.pumb_2;
                console.log('pumb2', vm.pumb_2);
                vm.wait2 = true;
                var msg = vm.pumb_2 ? "op2" : "fp2";
                sendMessage2(topicPublish2, msg);
            } else {
                console.log('wait...')
            }
        }
        function boiler1Change() {
            if (!vm.wait1) {
                vm.boiler_1 = !vm.boiler_1
                console.log('boiler1', vm.boiler_1);
                vm.wait1 = true;
                var msg = vm.boiler_1 ? "ob1" : "fb1";
                sendMessage(topicPublish1, msg);
            } else {
                console.log('wait...')
            }
        }
        function boiler2Change() {
            if (!vm.wait) {
                vm.boiler_2 = !vm.boiler_2;
                console.log('boiler2', vm.boiler_2);
                vm.wait2 = true;
                var msg = vm.boiler_2 ? "ob2" : "fb2";
                sendMessage2(topicPublish2, msg);
            } else {
                console.log('wait...')
            }
        }
        function light1Change() {
            if (!vm.wait1) {
                vm.light_1 = !vm.light_1;
                console.log('light1', vm.light_1);
                vm.wait1 = true;
                var msg = vm.light_1 ? "ol1" : "fl1";
                sendMessage(topicPublish1, msg);
            } else {
                console.log('wait...')
            }
        }

        function mode1Change() {
            if (!vm.wait1) {
                vm.manual_1 = !vm.manual_1;
                console.log('mode1', vm.manual_1);
                vm.wait1 = true;
                var msg = vm.manual_1 ? "ma1" : "au1";
                sendMessage(topicPublish1, msg);
            } else {
                console.log('wait...')
            }
        }

        function light2Change() {
            if (!vm.wait2) {
                vm.light_2 = !vm.light_2;
                console.log('light2', vm.light_2);
                vm.wait2 = true;
                var msg = vm.light_2 ? "ol2" : "fl2";
                sendMessage2(topicPublish2, msg);
            } else {
                console.log('wait...')
            }
        }

        function mode2Change() {
            if (!vm.wait2) {
                vm.manual_2 = !vm.manual_2;
                console.log('mode2', vm.manual_2);
                vm.wait2 = true;
                var msg = vm.manual_2 ? "ma2" : "au2";
                sendMessage2(topicPublish2, msg);
            } else {
                console.log('wait...')
            }
        }

        function send(id) {
            if (id == 1) {
                var msg = JSON.stringify(vm.zone1);
                sendMessage(topicPublish1, msg)
            } else {
                var msg = JSON.stringify(vm.zone2);
                sendMessage2(topicPublish2, msg)
            }
        }
    }
})();
