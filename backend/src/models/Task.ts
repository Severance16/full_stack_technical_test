import mongoose, { Schema, Document } from "mongoose";

const tasksStatus = {
  pending: "pending",
  in_progress: "In progress",
  finished: "Finished",
} as const;

export type TaskStatus = (typeof tasksStatus)[keyof typeof tasksStatus];

export interface ITask extends Document {
  name: string;
  description: string;
  status: TaskStatus;
}

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    status: {
      enum: Object.values(tasksStatus),
      default: tasksStatus.pending,
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