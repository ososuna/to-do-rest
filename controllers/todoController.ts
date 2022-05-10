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

  const { status = Status.Pending } = req.query;
  const query = { user: userId, active: true, status };

  const [ total, toDos ] = await Promise.all([
    ToDo.countDocuments( query ),
    ToDo.find( query )
  ]);

  toDos.sort( compareDates );

  return res.json({
    total,
    toDos
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
