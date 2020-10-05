
var client = new Paho.MQTT.Client(mqtt_server, mqtt_port,"");


function mqttConnect(){
   client.connect({onSuccess:onConnect});

   const txtSendBox = document.getElementById("serialSend");
   txtSendBox.innerHTML = "Trying to connect...";
}

function onConnect(){
   document.getElementById("serialSend").innerHTML = "Connected\n"

   client.onMessageArrived = onMessageArrived;
   client.onConnectionLost = onConnectionLost;

   client.subscribe(TOPIC_COM2WEB);
}

function sendCommand(text) {
   message = new Paho.MQTT.Message(text+ '\n');
   message.destinationName = TOPIC_WEB2COM;
   client.send(message);

   const txtSendBox = document.getElementById("serialSend");
   txtSendBox.innerHTML = text + '\n' + txtSendBox.innerHTML;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {

   if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);

      const txtSendBox = document.getElementById("serialSend");
      txtSendBox.innerHTML = "Connection Lost\n"+ responseObject.errorMessage+ "\n" + txtSendBox.innerHTML;
   }
}

function onMessageArrived(message) {
   const result =  message.payloadString.trim();
   const topic =  message.destinationName;

   //if(topic == TOPIC_WEB2COM){

   if(result != ""){
      document.getElementById("serialReceive").innerHTML += result;
      const txtReceiveBox = document.getElementById("serialReceive");
      txtReceiveBox.innerHTML = result + '\n' + txtReceiveBox.innerHTML
   }

   //}
}
