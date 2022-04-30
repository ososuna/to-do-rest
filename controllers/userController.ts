import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { IUser, User } from '../models/user';

export const getUsers = ( req: Request, res: Response ) => {
  res.json({
    msg: 'getUsers'
  });
}

export const getUser = ( req: Request, res: Response ) => {

  const { id } = req.params;

  res.json({
    msg: 'getUsers',
    id
  });
}

export const createUser = async( req: Request<{}, {}, IUser>, res: Response ) => {

  const { username, name, lastName, password } = req.body;

  const user = new User({
    username,
    name,
    lastName,
    password
  });

  const salt    = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  await user.save();

  res.json({
    msg: 'create user',
    user
  });
}

export const updateUser = ( req: Request, res: Response ) => {

  const { id }   = req.params;
  const { body } = req;

  res.json({
    msg: 'putUser',
    body
  });
}

export const deleteUser = ( req: Request, res: Response ) => {

  const { id }   = req.params;

  res.json({
    msg: 'deleteUser',
    id
  });
}
