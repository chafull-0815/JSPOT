# Testing rules

## Backend (Laravel 12 + Sail) - MUST use Sail

All backend commands MUST be executed via ./vendor/bin/sail.

### Commands (from project root)
```bash
cd backend

# Status
./vendor/bin/sail artisan migrate:status

# Fresh migration
./vendor/bin/sail artisan migrate:fresh --seed

# Run tests
./vendor/bin/sail test

# Single test
./vendor/bin/sail test --filter=SomeTest
```

### Merge requirements
- migrate:fresh --seed が成功
- sail test が成功

## Frontend (Next.js)

### Package manager
- package-lock.json → npm
- yarn.lock → yarn
- pnpm-lock.yaml → pnpm

### Commands (from project root)
```bash
cd frontend

# Lint (required)
npm run lint

# Test (if available)
npm run test

# e2e (if available)
npm run test:e2e
```

### Merge requirements
- lint が成功
- test があれば test 成功
