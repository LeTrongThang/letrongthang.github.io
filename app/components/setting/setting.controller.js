(function () {
    angular.module('app.components.setting')
        .controller('SettingController', SettingController);

    SettingController.$inject = ['$state', '$localStorage', 'messageShow', '$timeout', '$timeout'];
    function SettingController($state, $localStorage, messageShow, $timeout) {

        var vm = this;
        vm.connected1 = false;
        vm.wait1 = false;
        vm.listType = [];
        var topicPublish1 = "control";
        // var client = new Paho.MQTT.Client("host", port, "client_id");
        var client = new Paho.MQTT.Client("m13.cloudmqtt.com", 37587, "web_" + parseInt(Math.random() * 100, 10));
        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        vm.zone1Default = [
            {
                type: "Gà T1",
                highTemp: 33,
                lowTemp: 31,
                highHud: 75,
                lowHud: 60
            },
            {
                type: "Gà T2",
                highTemp: 31,
                lowTemp: 29,
                highHud: 75,
                lowHud: 60
            },
            {
                type: "Gà T3",
                highTemp: 28,
                lowTemp: 26,
                highHud: 75,
                lowHud: 60
            }
        ]
        
        if (!$localStorage.zone1) {
            $localStorage.zone1 = vm.zone1Default;
        }
      
        vm.zone1 = angular.copy($localStorage.zone1);
        vm.item1 = vm.zone1[0];
        vm.send = send;
        var options = {
            useSSL: true,
            userName: "pnhhztcw",
            password: "4pTHr5CT-jyB",
            onSuccess: onConnect,
            onFailure: doFail
        }
        vm.zone1Change = zone1Change;
        // connect the client
        client.connect(options);
        vm.index1 = 0;
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

        // called when the client loses its connection
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
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
            }
        }

        function send(id) {
            if (id == 1) {
                vm.zone1[vm.index1] = vm.item1;
                $localStorage.zone1 = vm.zone1;
                var item = angular.copy(vm.item1);
                delete item.type;
                var msg = JSON.stringify(item);
                sendMessage(topicPublish1, msg)
            } 
        }

        function zone1Change(item) {
            $timeout(function () {
                vm.item1 = item;
                var index = _.findIndex(vm.zone1, vm.item1)
                vm.index1 = index;
            })
        }
    }
})();
