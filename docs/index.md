# CNC Based 3 axis remote
### CO326 Computer Systems Engineeging

## Overview
Overview
Over the past few decades technology has been evolving rapidly in so many aspects and fields to reach out to the human population in a more user-friendly manner. With these technological developments, new terms like “distance learning”, “remote laboratories”, “virtual learning environments” etc have emerged. However, labs have the greatest potential to overcome the bottleneck in distance education. The goal of Remote Laboratory implementation is to grant students access to laboratory equipment and cover physical laboratory exercises remotely.

A programmable logic controller (PLC) is a special purpose industrial computer/controller that has been adapted to control manufacturing processes. Hence, PLC is widely used in manufacturing to organize complex tasks like security monitoring, automatic control production lines, and management of energy consumption. As a result, there is a great need for engineers with knowledge of PLC. High cost, limited equipment, and limited access to this equipment make it difficult to access everyone.

Hence, connecting PLC with the remote laboratory enables educational institutions to offer programs to a much broader target group of potential students who under no circumstances are able to travel to and attend on-site sessions.

In this project, we hope to develop a CNC (Computer Numerical Control) based pick and place arm, which will help to try different wiring arrangements in a PLC rig and try experiments one it remotely.

![image](https://user-images.githubusercontent.com/11540782/96546930-d7e80b80-12c8-11eb-9da6-d58732abf7e5.png)Figure 1: An example of a Pick and Place CNC machine

![image](https://user-images.githubusercontent.com/11540782/96547002-f6e69d80-12c8-11eb-92b2-009d241a60fb.png)Figure 2: PLC Test Rig of the department of computer engineering

## Specifications
### Software Layer
Web HMI with Javascript
MQTT broker for communication
### Hardware Software Interface
Using standard G-code language for machine control
A firmware like Merlin/Gerber will be supposed to use
Communication is done by USART protocol, with a baud rate of 115000bps
### Hardware Layer
- Nema17 standard stepper motors for motion control
- DRV8825 for stepper motor control
- Arduino Mega 2560 for motion planning

# Methodology

It is constructed using the CNC technology, using Stepper motors with a combination of Screw and Bolt mechanism (for Y and Z axises) and Belt and Pulley mechanism (For X axis). Stepper motors are driven by DRV8825 Step stick drivers with microstepping of 1/16 mode. The microcontroller for the machine is Arduino Mega 2560, with the support of RAMPS 1.4 shield for additional hardware.

The firmware we used is known as GRBL, a well known firmware which drives CNC machines using AVR family microcontrollers. We used GCODE to instruct the machine about movements in 3d space. The software named ‘Candle’ is used to control the machine from PC, and send machine commands as well as configuration commands.    

Communication protocol between HMI and the server needed careful consideration. The messages should be exchanged through the public internet and it should be lightweight since the messages need to arrive with minimum latency which could potentially disrupt the operation of the CNC machine. Therefore, the protocol should be able to handle unreliable networks. Also the messages only contain small commands that need to be passed to the hardware controller. Therefore, the message overhead should be minimum. And most importantly it should be able to handle multiple users. So students can work in groups controlling the PLC rig remotely. Considering all these requirements we used MQTT (Message Queue Telemetry Transport) as the message passing protocol. Because, MQTT is a lightweight message protocol that is based on a subscription-publishing model, in which publishers send messages to a server and this is who forwards messages to subscribers avoiding point-to-point connections between subscribers and publishers.

Students can log into the remote platform using the HMI developed using Javascript (along with HTML and CSS). Then they can use the HMI to send signals to control the CNC machine. The control messages get published to a MQTT broker. A server physically connected to the hardware controller subscribed to the MQTT broker receives the control messages. The control messages contain GCODE commands needed to control  the machine. The server sends the G-CODE commands through a serial interface to the ATMEGA 2560 which runs the GRBL. GRBL converts the control signals to electronic signals and sends to the motor driver, which controls the three server motors. This moves the 3-axis of the CNC machine.   

## Design

![image](https://user-images.githubusercontent.com/11540782/96547229-6066ac00-12c9-11eb-8087-6cc6f2a74558.png)

![image](https://user-images.githubusercontent.com/11540782/96547467-c3584300-12c9-11eb-9978-2b5fc89b1ce0.png)

### Team Members
 - Jaliyagoda A.J.N.M. (E/15/140)
 - Karunarathna S.D.D.D. (E/15/173)
 - Tennakoon T.M.P.B. (E/15/350)
