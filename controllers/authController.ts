import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User, IUser } from '../models/user';
import { generateJWT } from '../helpers/jwt';

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
    msg: 'user created successfully',
    user
  });
}

export const loginUser = async( req: Request, res: Response ) => {

  const { username, password } = req.body;

  try {
    const dbUser = await User.findOne({ username });

    if ( !dbUser ) {
      return res.status(400).json({
        msg: 'Invalid username or password'
      });
    }

    const validPassword = bcryptjs.compareSync( password, dbUser.password );

    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Invalid email or password'
      });
    }

    const token = await generateJWT( dbUser.id, dbUser.name );

    return res.json({
      uid:      dbUser.id,
      name:     dbUser.name,
      lastName: dbUser.lastName,
      token
    });

  } catch ( error ) {
    console.log( error );
    return res.status(500).json({
      msg: 'Please talk to the admin'
    });
  }

}

export const renewToken = async( req: Request, res: Response ) => {

  const { uid, name } = req.body;
  const token = await generateJWT( uid, name );
  const user = await User.findById( uid );

  if ( user ) {
    const { username, lastName } = user;
    return res.json({
      uid,
      username,
      name,
      lastName,
      token
    });
  } else {
    return res.status(400).json({
      msg: 'User not found'
    });
  }
}
