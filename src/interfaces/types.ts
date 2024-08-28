import { Response } from "express"

export interface envTypes {
    PORT: string,
    MONGO_URI: string,
    RABBITMQ_URI: string
}

export interface responseTypes {
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    error?: string | {},
    data?: string | {}
}

export interface productListTypes {
    productID: string,
    price: number,
    quantity: number
}

export interface orderSchema {
    orderID: string,
    productList: productListTypes[],
    totalPrice: number,
    userID: string,
    fulfilledStatus?: boolean
}

export interface orderQueueMsgTypes {
    userID: string,
    orderID: string
}

export interface notificationMsgTypes {
    userID: string,
    paymentID?: string,
    orderID?: string,
    message: string,
    status?: boolean
}

export interface paymentSchemaTypes {
    orderID: string,
    userID: string,
    paymentID: string,
    paymentStatus: string
}

export interface paymentQueueMsgTypes {
    userID: string,
    orderID: string,
    paymentID: string,
    status: boolean
}