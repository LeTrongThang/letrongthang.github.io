(function () {
    angular.module('app.components.control')
        .controller('ControlController', ControlController);

    ControlController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', '$timeout'];
    function ControlController($state, $localStorage, messageShow, $timeout) {

        var vm = this;
        vm.manual_1 = false;
        vm.zone_1 = [];
        vm.pumb_1 = false;
        vm.boiler_1 = false;
        vm.fan_1 = false;
        vm.light_1 = false;
        vm.fan1Change = fan1Change;
        vm.pumb1Change = pumb1Change;
        vm.boiler1Change = boiler1Change;
        vm.light1Change = light1Change;
        vm.mode1Change = mode1Change;
        vm.connected1 = false;
        vm.wait1 = false;
        vm.listType = [];
        var topicPublish1 = "control";
        // var client = new Paho.MQTT.Client("host", port, "client_id");
        var client = new Paho.MQTT.Client("m13.cloudmqtt.com", 	37587, "web_" + parseInt(Math.random() * 100, 10));
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        vm.zone1 = {
            id: 1
        };
        vm.send = send;
        var options = {
            useSSL: true,
            userName: "pnhhztcw",
            password: "4pTHr5CT-jyB",
            onSuccess: onConnect,
            onFailure: doFail
        }

        // connect the client
        client.connect(options);

        // called when the client connects
        function onConnect() {
            // Once a connection has been made, make a subscription and send a message.
            console.log("onConnect");
            client.subscribe("event");
            $timeout(function () {
                vm.connected1 = true;
                vm.wait1 = false;
            });
        }

        function doFail(e) {
            console.log(e);
        }
        function sendMessage(destination, message) {
            var message = new Paho.MQTT.Message(message);
            message.destinationName = destination;
            client.send(message);
        }
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
            }
        }
        
        function onMessageArrived(message) {
            console.log("onMessageArrived:" + message.payloadString);
            if (message.destinationName == "event") {
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
