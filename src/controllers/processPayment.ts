import { Request, Response } from "express";
import { response } from "../common/responses";
import { StatusCodes } from "http-status-codes";
import messages from "../utils/messages";

async function processPayment(req:Request, res:Response) {
    try {
        // consume order details from rabbitmq server
        // process the payment for the given order - success | failure
        const random  = Math.floor(Math.random() * 2)
        console.log(random)

        // after processing store payment details in payment table along with its status

        // publish every event where payment status is a success(or failure) to rabbitmq server

        response({res, statusCode:StatusCodes.OK, success:true, message:messages.PAYMENT_SUCCESS})
    } catch (error) {
        response({res, statusCode:StatusCodes.BAD_REQUEST, success:false, message:messages.PAYMENT_FAILED, error: {error}})
    }
}

export default processPayment