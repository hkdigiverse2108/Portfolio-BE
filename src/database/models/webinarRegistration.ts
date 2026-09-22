import mongoose from "mongoose";
import { baseCommonFields, baseSchemaOptions } from "./base";
import { IWebinarRegistration } from "../../type";

const webinarRegistrationSchema = new mongoose.Schema<IWebinarRegistration>(
  {
    isWebinarRegistration: { type: Boolean, default: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phoneNo: { type: String, required: true },
    startupName: { type: String },
    amount: { type: Number, default: 99 },
    currency: { type: String, default: "INR" },
    webinarDate: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paymentFailureReason: { type: String },
    ...baseCommonFields,
  },
  baseSchemaOptions,
);

// Map to existing "contact-us" collection to avoid Atlas collection limit error
export const webinarRegistrationModel = mongoose.model<IWebinarRegistration>(
  "webinar-registration",
  webinarRegistrationSchema,
  "contact-us",
);
