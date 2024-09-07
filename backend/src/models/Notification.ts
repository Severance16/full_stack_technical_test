import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;
  delegate: Types.ObjectId;
}

const NotificationSchema: Schema = new Schema(
  {
    user: {
      type: String,
      require: Types.ObjectId,
      ref: "User"
    },
    delegate: {
      type: String,
      require: Types.ObjectId,
      ref: "User"
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: "1d"
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>("Notification", NotificationSchema)
export default Notification