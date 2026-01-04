# Restore steps (JSPOT / myapp)

This archive contains the Laravel app snapshot up to the point where migrations run successfully.

## 1) Put the folder in place

Example:

- `~/Desktop/JSPOT/myapp`  (recommended)

If you already have a `myapp` folder, either back it up or remove it first.

## 2) Start Sail

From the project root:

```bash
cd ~/Desktop/JSPOT/myapp

# if vendor is not present yet, you can use PHP on host (if available) or Sail composer
php -v || true

./vendor/bin/sail up -d
```

## 3) Install dependencies (if vendor / node_modules are not included)

```bash
./vendor/bin/sail composer install
./vendor/bin/sail npm install
```

## 4) Run migrations

```bash
./vendor/bin/sail artisan migrate:fresh
```

If you want to seed later, add `--seed` after you create seeders.
