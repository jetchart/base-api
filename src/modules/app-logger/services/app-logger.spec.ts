import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AppLogger } from './app-logger';

describe('AppLoggerService', () => {
  let service: AppLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppLogger],
    }).compile();

    service = module.get<AppLogger>(AppLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
