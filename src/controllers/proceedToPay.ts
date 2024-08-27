import paymentModel from "../models/paymentsModel";
import { notificationMsgTypes, orderQueueMsgTypes, paymentQueueMsgTypes, paymentSchemaTypes } from "../interfaces/types";
import { bindingKeys, notifications } from "../utils/enums";
import connectRabbitMQ from "../rabbitmq/sender";
import { v4 as uuidv4 } from "uuid";

async function proceedToPay (msg:any) {
    try {
        // consume order details from rabbitmq server
        // process the payment for the given order - success | failure
        const random = Math.floor(Math.random() * 2)
        const status = random ? 'success' : 'failure'

        const contents = msg?.content?.toString()
        if(!contents){
            throw new Error('Error: No Contents Recieved!')
        }
        const parsedContents:orderQueueMsgTypes = JSON.parse(contents)
        const {userID, orderID} = parsedContents

        // after processing store payment details in payment table along with its status
        console.log('msg.ok', parsedContents.userID)
        const paymentID = uuidv4()
        const newPayment = new paymentModel({
            paymentID,
            userID,
            orderID,
            paymentStatus:status
        })
        await newPayment.save()

        // publish every event where payment status is a success(or failure) to rabbitmq server
        const paymentQueueMsg:paymentQueueMsgTypes = {
            userID,
            orderID,
            paymentID,
            status: status === 'success' ? true : false
        }
        const notificationMsg:notificationMsgTypes = {
            userID,
            message: status === 'success' ? `${notifications.PAYMENT_SUCCESS}${orderID}` : `${notifications.PAYMENT_FAILED}${orderID}`
        }

        connectRabbitMQ(paymentQueueMsg, bindingKeys.PAYMENT_PROCESSED, notificationMsg)

    } catch (error) {
        console.log('Error from proceedToPay',error)
    }
}

export default proceedToPay