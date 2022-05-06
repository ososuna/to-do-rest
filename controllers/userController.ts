import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { IUser, User } from '../models/user';

export const getUsers = async( req: Request, res: Response ) => {

  const { limit = 5, skip = 0 } = req.query;
  const query = { estado: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip(Number( skip ))
      .limit(Number( limit ))
  ]);

  res.json({
    total,
    users
  });
}

export const updateUser = async( req: Request<{ id: string }, {}, IUser>, res: Response ) => {

  const { id } = req.params;
  const { _id, password, ...rest } = req.body;

  const user = new User({ rest });
  delete user._id;

  console.log( user );

  if ( password ) {
    const salt    = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
  }

  const updatedUser = await User.findByIdAndUpdate( id, user );

  res.json({
    msg: 'user updated successfully',
    user: updatedUser
  });
}

export const deleteUser = ( req: Request, res: Response ) => {

  const { id }   = req.params;

  res.json({
    msg: 'deleteUser',
    id
  });
}
