import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from 'src/modules/app-logger/app-logger';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      this.logger.error('Unhandled error occurred', error);
      res.status(500).json({
        statusCode: 500,
        message: 'Unhandled error occurred',
        path: req.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
