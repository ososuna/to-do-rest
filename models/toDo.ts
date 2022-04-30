import { Schema, model } from 'mongoose';

const ToDoSchema = new Schema({
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
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Completed']
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = model( 'ToDo', ToDoSchema );
