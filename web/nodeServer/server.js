
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://webservices.ceykod.com');

const TOPIC_WEB2COM = 'co326/web2com';

client.on('connect', function () {
   client.subscribe(TOPIC_WEB2COM);
})

client.on('message',function(topic, message, packet){
    console.log("topic is "+ topic);
	console.log("message is "+ message);
});
