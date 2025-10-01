
# Base API

A base API built with NestJS, TypeORM, PostgreSQL, and Google authentication. Includes structured logging with [nestjs-pino](https://github.com/iamolegga/nestjs-pino).

---

## Requirements

- Node.js >= 18
- PostgreSQL (or a compatible connection URL)
- Yarn or npm

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <REPO_URL>
   cd base-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy the example file and edit it:
     ```sh
     cp .env.example .env
     ```
   - Fill in the required values in `.env` (DB_URL, JWT_SECRET, GOOGLE_CLIENT_ID, etc).

---

## Migrations

- **Generate a migration:**
  ```sh
  npm run typeorm:migration:generate -- MIGRATION_NAME=YourMigrationName
  ```
- **Run migrations:**
  ```sh
  npm run typeorm:migration:run
  ```

---

## Running

- **Development mode:**
  ```sh
  npm run start:dev
  ```
- **Production mode:**
  ```sh
  npm run build
  npm run start:prod
  ```

The API will be available on the port defined by `NEST_PORT` (default: 3000).

---

## Logging

The app uses [nestjs-pino](https://github.com/iamolegga/nestjs-pino) for structured logs.
You can inject the logger in your controllers or services using:

```typescript
import { Logger } from 'nestjs-pino';

constructor(private readonly logger: Logger) {}

this.logger.info('Log message');
```

Or use the custom logger `AppLogger`:

```typescript
import { AppLogger } from './app-logger/app-logger';

constructor(private readonly logger: AppLogger) {}

this.logger.success('Context', 'Success message');
```

---

## Google Authentication

The endpoint `/auth/google/login` allows authentication with Google.
Send the Google token in the body:

```json
{
  "token": "GOOGLE_ID_TOKEN"
}
```

---

## CORS

CORS is enabled for the frontend defined in the `WEB_HOST` variable.

---

## Testing

- **Run tests:**
  ```sh
  npm run test
  ```

---

## Main Structure

- `src/modules/` — Main app modules
- `src/config/` — Environment configuration
- `src/database/migrations/` — TypeORM migrations

---

## License

MIT
