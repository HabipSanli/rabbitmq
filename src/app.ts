import express from "express";
import client, { Connection, Channel, ConsumeMessage } from "amqplib";

//const amqp = require('amqplib/callback_api');
const cors = require('cors');
const PORT = 5672;

const connection = await client.connect(`amqp://localhost:${PORT}`);
const channel = await connection.createChannel()
await channel.assertQueue("myqueue")

const sendMessages = (channel: Channel) => {
    for (let i = 0; i < 10; i++) {
      channel.sendToQueue('myQueue', Buffer.from(`message ${i}`))
    }
}

const consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
    if (msg) {
      // Display the received message
      console.log(msg.content.toString())
      // Acknowledge the message
      channel.ack(msg)
    }
}

sendMessages(channel);


const app = express();
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}));
