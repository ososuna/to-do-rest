import { Request, Response } from 'express';
import { IToDo, ToDo } from '../models/toDo';
import { User } from '../models/user';

export const getTodos = async( req: Request<{ userId: string }, {}, {}>, res: Response ) => {

  const { userId } = req.params;
  const toDos = await ToDo.find({ user: userId });

  const toDosByDate: { date: Date, toDos: IToDo[] }[] = [];

  toDos.forEach( toDo => {
    const date = new Date( toDo.date );
    const toDosByDateItem = toDosByDate.find( item => item.date.getTime() === date.getTime() );
    if ( toDosByDateItem ) {
      toDosByDateItem.toDos.push( toDo );
    } else {
      toDosByDate.push( { date, toDos: [ toDo ] } );
    }
  });

  console.log(...toDosByDate);


  return res.json({
    ...toDosByDate
  });

}

export const createTodo = async( req: Request<{ userId: string }, {}, IToDo>, res: Response ) => {

  const { userId } = req.params;
  const { title, description, date } = req.body;

  const toDo = new ToDo({
    title,
    description,
    date
  });

  await toDo.save();
  await User.findByIdAndUpdate( userId, { $push: { toDos: toDo._id } } );

  return res.status(201).json({
    msg: 'to do created successfully',
    toDo
  });

}

export const completeTodo = async( req: Request, res: Response ) => {

}

