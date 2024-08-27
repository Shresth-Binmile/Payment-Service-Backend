import amqp from 'amqplib/callback_api'
import { bindingKeys } from '../utils/enums';
import proceedToPay from '../controllers/proceedToPay';
import messages from '../utils/messages';

function recieveFromRabbitMQ () {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue1 = bindingKeys.ORDER_CREATED;
            var queue2 = bindingKeys.ORDER_UPDATED;
    
            channel.assertQueue(queue1, {
                durable: true
            });
            channel.assertQueue(queue2, {
                durable: true
            })
    
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue1);
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue2);
    
            channel.consume(queue1,async function(msg) {
                console.log(` [x] Received %s from ${queue1}`, msg?.content.toString());
                await proceedToPay(msg)
                console.log(`Acknowledged ${queue1}:`, messages.MESSAGE_SEND)
            }, {
                noAck: true
            });
            channel.consume(queue2,async function(msg) {
                console.log(` [x] Received %s from ${queue2}`, msg?.content.toString());
                await proceedToPay(msg)
                console.log(`Acknowledged ${queue2}:`, messages.MESSAGE_SEND)
            }, {
                noAck: true
            });
        });
    });
}

export default recieveFromRabbitMQ