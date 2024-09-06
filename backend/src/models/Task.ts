import mongoose, { Schema, Document } from "mongoose";

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
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema)
export default Task