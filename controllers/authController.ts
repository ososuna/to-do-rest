import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user';
import { generateJWT } from '../helpers/jwt';

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
