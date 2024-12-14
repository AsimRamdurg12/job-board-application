import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const SignUpValidate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation error',
      });
      console.log(error);
      
    }
  };
