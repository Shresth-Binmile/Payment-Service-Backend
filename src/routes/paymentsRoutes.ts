import { Router } from "express";
import { urls } from "../utils/enums";
import processPayment from "../controllers/processPayment";

const router = Router()

// router.post(urls.PAYMENT_PROCESS, processPayment)

export default router