import { Request, Response } from 'express';
import { compareDates } from '../helpers/compare';
import { IToDo, Status, ToDo } from '../models/toDo';
import { User } from '../models/user';

export const getTodos = async( req: Request<{ userId: string }, {}, {}>, res: Response ) => {

  const { userId } = req.params;
  const user = await User.findById( userId );

  if ( !user ) {
    return res.status(400).json({
      msg: 'user not found'
    });
  }

  const toDos = await ToDo.find({ user: userId, active: true, status: 'pending' });
  toDos.sort( compareDates );

  const toDosByDate: { [key: string]: IToDo[] } = {};

  toDos.forEach( toDo => {
    const date = toDo.date.toISOString().split('T')[0];
    if ( !toDosByDate[date] ) {
      toDosByDate[date] = [];
    }
    toDosByDate[date].push( toDo );
  });

  return res.json({
    ...toDosByDate
  });

}

export const createTodo = async( req: Request<{ userId: string }, {}, IToDo>, res: Response ) => {

  const { userId } = req.params;
  const user = await User.findById( userId );

  if ( !user ) {
    return res.status(400).json({
      msg: 'user not found'
    });
  }

  const { title, description, date } = req.body;

  const toDo = new ToDo({
    title,
    description,
    date,
    user,
  });

  const toDoCreated = await toDo.save();
  await User.findByIdAndUpdate( userId, { $push: { toDos: toDoCreated } } );

  return res.status(201).json({
    msg: 'to do created successfully',
    toDo
  });

}

export const completeTodo = async( req: Request, res: Response ) => {

  const { id } = req.params;

  const toDo = await ToDo.findByIdAndUpdate( id, { $set: { status: Status.Completed } } );

  if ( !toDo ) {
    return res.status(400).json({
      msg: 'to do not found'
    });
  }

  return res.status(201).json({
    msg: 'to do completed successfully',
    toDo
  });

}
