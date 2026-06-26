import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Catch Zod validation failures first
  if (err instanceof ZodError) {
    const zodErr = err as any;
    const errList = zodErr.errors || zodErr.issues || [];
    const formattedErrors = errList.map((e: any) => ({
      path: e.path ? e.path.join('.') : '',
      message: e.message
    }));
    return res.status(400).json({ error: 'Validation failed', details: formattedErrors });
  }


  if (err.code) {

    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username already exist' });
    }
    if (err.code === '23514') {
      return res.status(400).json({ error: 'Database constraint violation (e.g. invalid username format)' });
    }
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Internal server error' });
};
