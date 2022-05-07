import { Document, model, Model, Schema } from 'mongoose';
import { IToDo } from './toDo';

export interface IUser extends Document {
  uid?:       string;
  username:   string,
  name:       string,
  lastName:   string,
  password:   string,
  toDos:      IToDo[],
  active:     true
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  toDos: [{
    type: Schema.Types.ObjectId,
    ref: 'ToDo',
    default: []
  }],
  active: {
    type: Boolean,
    default: true
  }
});

export const User: Model<IUser> = model('User', UserSchema);
