
var SerialPort = require('serialport');
var WebSocketServer = require('ws').Server;

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

const TOPIC_COM2WEB = 'co326/com2web';
const TOPIC_WEB2COM = 'co326/web2com';



// USB Port selection
console.log("Available Ports: ");
SerialPort.list(function (err, ports) {
   ports.forEach(function(port) {
      console.log("\t" + port.comName);
   });
});
console.log("\n");

if(process.argv[2]==""){
   console.log("Invalid arguments. Type it as, \nnode server.js COMx");
}

// Need to write a validator to check this is available
var portName =  process.argv[2];

var myPort = new SerialPort(portName,{baudRate: 115200 });
var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
myPort.pipe(parser);

// these are the definitions for the serial events:
myPort.on('open', showPortOpen);
myPort.on('close', showPortClose);
myPort.on('error', showError);
parser.on('data', readSerialData);








// --------------------------------------------------------

client.on('connect', function () {
   client.subscribe(TOPIC_WEB2COM, function (err) {
      if (!err) {
         client.publish(TOPIC_WEB2COM, 'MQTT connection: success');
      }
   })
})

client.on('message', function (topic, message) {
   if(topic==TOPIC_WEB2COM){
      console.log("-> "+message.toString())
      sendToSerial(message.toString() + '\n');

   }
});






// ------------------------ Serial event functions:
function showPortOpen() {
   console.log('>> port open. Data rate: ' + myPort.baudRate);
}

function readSerialData(data) {
   console.log("<< " + data);
   client.publish(TOPIC_COM2WEB, data);
}


function showPortClose() {
   console.log('>> port closed.');
}
// this is called when the serial port has an error:
function showError(error) {
   console.log('>> port error: ' + error);
}

function sendToSerial(data) {
   console.log(">> sending to serial: " + data);
   myPort.write(data);
}
