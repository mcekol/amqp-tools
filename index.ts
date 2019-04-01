import * as amqp from 'amqplib';

async function start(url, q) {
	const conn = await amqp.connect(url);
	let ch = await conn.createChannel();

	await ch.assertQueue(q);
	return ch.consume(q, msg => {
		if (msg !== null) {
			console.log('--- Message content start ---');
			console.log(msg.content.toString());
			console.log('--- Message content end ---');
			ch.ack(msg);
		}
	});
}

const [url, q] = process.argv.slice(2);

start(url, q);
