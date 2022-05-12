import { Document, model, Model, Schema } from 'mongoose';
import { IUser } from './user';

export enum Status {
  Pending   = 'pending',
  Completed = 'completed'
}

export interface IToDo extends Document {
  title:          string,
  description?:   string,
  date:           Date,
  user:           IUser,
  status:         Status.Pending,
  active:         true
}

export const ToDoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    default: Status.Pending,
    enum: Status
  },
  active: {
    type: Boolean,
    default: true
  }
});

export const ToDo: Model<IToDo> = model('ToDo', ToDoSchema);
