import mongoose from "mongoose";
import { paymentSchemaTypes } from "../interfaces/types";

const paymentSchema = new mongoose.Schema<paymentSchemaTypes>({
    paymentID: {
        type: String || mongoose.SchemaTypes.UUID,
        required: true,
        unique: true
    },
    orderID: {
        type: String || mongoose.SchemaTypes.UUID,
        required: true,
        unique: true
    },
    userID: {
        type: String || mongoose.SchemaTypes.ObjectId,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['success', 'failure'],
        required: true
    }
})

const paymentModel = mongoose.model('Payments', paymentSchema)

export default paymentModel
