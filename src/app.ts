import express from "express";
const cors = require("cors");
import amqp from 'amqplib';
import { initRabbit, consumeMessage } from "./rabbit";
const PORT = 5672;


initRabbit().then(() =>{
	consumeMessage();
})



/*
function start() {
	amqp.connect(`amqp://localhost:${PORT}` + "?heartbeat=60", function(err, conn) {
	  if (err) {
		console.error("[AMQP]", err.message);
		return setTimeout(start, 1000);
	  }
	  conn.on("error", function(err) {
		if (err.message !== "Connection closing") {
		  console.error("[AMQP] conn error", err.message);
		}
	  });
	  conn.on("close", function() {
		console.error("[AMQP] reconnecting");
		return setTimeout(start, 1000);
	  });
	  console.log("[AMQP] connected");
	  acon = conn;
	  whenConnected();
	});
}

function whenConnected(){
	startReceiver();
}

function startReceiver(){
	acon.createChannel(function(err,ch){
		if(err){
			console.log('Channel failed');
			return;
		}
		ch.on('error', function(err){
			console.error('Channel error');
		});
		ch.on('close',function(err){
			console.error('Channel closed');
		});
		ch.assertQueue('main', {durable : true});
		//ch.prefetch(1);
		ch.consume('main',function(msg){
			if(msg !== null)
				console.log('Received!');
				let rpc = msg?.properties.replyTo;
				let rpc_id = msg?.properties.correlationId;
				ch.sendToQueue(rpc,Buffer.from('Received'),{correlationId : rpc_id})

		})
	})
}
start();
*/

//////////////////////Denemeler///////////////////
/*
const connectToRabbit = () => {
	amqp.connect(`amqp://localhost:${PORT}`, function (err, conn){
		if(err){
			console.log(err);
			console.log('AmQP Failed! Reconnectiong 1s');
			setTimeout(connectToRabbit,1000);
			return;
		}
		conn.createChannel((err,ch) =>{
			if(!err){
				console.log('Channel created');
			}
		});
		conn.on('error',function(err){
			if (err.msg !== 'Connection Closing'){
				console.error('AMQP conn error');
			}
		});
		conn.on('closed',function(err){
			console.error("[AMQP] reconnecting!");
			connectToRabbit();
		})
	})
}
connectToRabbit();
*/
