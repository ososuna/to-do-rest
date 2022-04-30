import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
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

module.exports = model( 'User', UserSchema );
