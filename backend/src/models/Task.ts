import mongoose, { Schema, Document, Types } from "mongoose";

const tasksStatus = {
  PENDING: "pending",
  IN_PROGRESS: "In progress",
  FINISHED: "Finished",
} as const;

export type TasksStatus = (typeof tasksStatus)[keyof typeof tasksStatus];

export interface ITask extends Document {
  name: string;
  description: string;
  status: TasksStatus;
  responsible: string;
  delegate: string
}

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: Object.values(tasksStatus),
      default: tasksStatus.PENDING,
    },
    description: {
      type: String,
      require: true,
    },
    responsible: {
      type: Types.ObjectId,
      ref: "User"
    },
    delegate: {
      type: Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema)
export default Task