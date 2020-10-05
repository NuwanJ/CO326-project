
function mqttConnect(){
   client.connect({onSuccess:onConnect});
   document.getElementById("serialSend").innerHTML = "Trying to connect...";
}

function onConnect(){
   document.getElementById("serialSend").innerHTML = "Connected\n"

   client.onMessageArrived = onMessageArrived;
   client.subscribe(TOPIC_COM2WEB);
}

function sendCommand(text) {
   var mqtt_msg = text;
   message = new Paho.MQTT.Message(mqtt_msg);
   message.destinationName = TOPIC_WEB2COM;
   client.send(message + '\n');
   document.getElementById("serialSend").innerHTML += mqtt_msg + "\n";
}

function onMessageArrived(message) {
   const result =  message.payloadString + "\n";
   const topic =  message.destinationName;

   //if(topic == TOPIC_WEB2COM){
      document.getElementById("serialReceive").innerHTML += result;
   //}
}
