import amqp from "amqplib";

const PORT = 5672;
let acon: amqp.Connection;
let channel : amqp.Channel;

export async function initRabbit(){
	acon = await amqp.connect(`amqp://localhost:${PORT}`);
	channel = await acon.createChannel()
	channel.prefetch(1);
	channel.assertQueue('rpc', {durable : true});
    console.log('Connection initialized.');
	return channel;
}

export async function consumeMessage(){
    channel.consume('rpc', (msg)=>{
        if(msg !== null){
            console.log(msg.content);
            let reply = msg.properties.replyTo;
            let coId = msg.properties.correlationId;
            channel.sendToQueue(reply,Buffer.from(msg.content),{correlationId : coId});
            channel.ack(msg)
        }else{
            console.log('something failed');
        }
        
    })
    
} 
//////////////////////////Legacy Code///////////////////////////////////////
/*
// const channel = getRabbitmqChannel()
export const onMsg = (msg) => {
    var n = 0;
    if (msg) {
        n = parseInt(msg.content.toString());
    }
    console.log(" [.] sqr(%d)", n);
    var r = n * n;

    if(msg){
        rpcResponse(reply, msg, corelation);
        // channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
        //     correlationId: msg.properties.correlationId,
        // });
        // channel.ack(msg);
    }
    
}
*/