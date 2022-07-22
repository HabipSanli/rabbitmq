import amqp from "amqplib/callback_api";
const PORT = 5672;

/*
amqp.connect(`amqp://localhost:${PORT}`, function (error0, connection) {
	if (error0) {
		throw error0;
	}
	connection.createChannel(function (error1, channel) {
		if (error1) {
			throw error1;
		}

		var queue = "hello";

		channel.assertQueue(queue, {
			durable: false,
		});

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

		channel.consume(
			queue,
			function (msg) {
				if (msg != null) console.log(" [x] Received %s", msg.content.toString());
				else {
					console.log("msg is null");
				}
			},
			{
				noAck: true,
			}
		);
	});
});
*/