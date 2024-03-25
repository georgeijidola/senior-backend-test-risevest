## Getting Started

### Prerequisites

- Node.js
- Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/georgeijidola/senior-backend-test-risevest.git
   ```

2. Copy and set environment variables
   On Unix/Linux/macOS:

```sh
cp .env.example .env
```

On Windows (Command Prompt):

```cmd
copy .env.example .env
```

3. Build and connect to the dev environment

```sh
npm run docker:start:sh
```

4. Setup Database

```sh
npm run db:setup
```

5. Run migrations

```sh
npm run db:migrate:up
```

6. Start server

```sh
npm run start:dev
```

### Testing

Run tests in docker shell:

```bash
npm test
npm run test:unit
npm run test:integration
npm run test:watch
npm run test:coverage
```

### API Documentation

API documentation can be found [here](https://documenter.getpostman.com/view/4872797/2sA35D4Nej).
Answer to the query optimisation can be found [here](https://github.com/georgeijidola/senior-backend-test-risevest/blob/master/_docs/QUERY-ANSWER.mdj).
Postman collection can be found [here](https://github.com/georgeijidola/senior-backend-test-risevest/blob/master/_docs/Risevest%20Assessment%20Test.postman_collection.json).
