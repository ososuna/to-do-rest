import { Request, Response } from 'express';
import { validationResult }  from 'express-validator';

export const validateFields = ( req: Request, res: Response, next: () => void ) => {

  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {
    return res.status(400).json({
      errors: errors.mapped()
    });
  }

  next();

}
