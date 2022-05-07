import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const validateJWT = ( req: Request<{}, {}, IUser>, res: Response, next: () => void ) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      msg: 'token is mandatory'
    });
  }

  try {
    const payload = jwt.verify( token, process.env.SECRET_JWT_SEED || '' ) as IUser;
    if ( payload ) {
      const { username, name, lastName } = payload;
      req.body.username = username;
      req.body.name = name;
      req.body.lastName = lastName;
    }
  } catch ( error ) {
    return res.status(401).json({
      msg: 'invalid token'
    });
  }
  next();
}
