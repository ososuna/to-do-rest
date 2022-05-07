import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/user';
import { IUserPayload } from '../models/userPayload';

export const validateJwt = ( req: Request<{}, {}, IUser>, res: Response, next: () => void ) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      msg: 'token is mandatory'
    });
  }

  try {
    const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED || '' ) as IUserPayload;

    req.body.uid  =  uid  || '';
    req.body.name =  name || '';

  } catch ( error ) {
    return res.status(401).json({
      msg: 'invalid token'
    });
  }
  next();
}
