# CONTEXT (Project facts)

## Tech stack
- Backend: Laravel 12 + Sail
- Database: PostgreSQL
- Frontend: Next.js
- Admin panel: Filament v4
- CI: GitHub Actions

## Policy
- Backend commands are ALWAYS executed via Sail
- DB migrations: no after(), no unsigned, staged breaking changes
- Filament v4: breaking schema changes require staged migration

## Current features

### Likes
- `user_likes`: 1 user × 1 store = 1 like (no unlike)
- `stores.likes_count`: cached count of user_likes
- `stores.admin_likes`: admin manual boost (for paid customers)

### View history
- Supports guest users via visitor_id (ULID in cookie)
- Max 30 entries per actor (pruned in application)
- actor_key = "U:{user_id}" or "V:{visitor_id}"

### Geo search
- 3km radius search using bbox + haversine
- Index on (latitude, longitude)

### Access control
- `user_access_grants`: admin grants influencer/store role
- `user_login_links`: magic link for portal access (token stored as hash)

### Lines & stations
- 2 lines
- stations.slug unique per line (composite unique: line_id, slug)

## Directory structure
```
/Users/shogo/Desktop/JSPOT/
├── CLAUDE.md           # Entry point for Claude Code
├── .claude/rules/      # Rule files
├── docs/ai/            # AI context docs
├── backend/            # Laravel 12 + Sail
│   ├── CLAUDE.md       # Backend-specific (imports root)
│   ├── app/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── ...
└── frontend/           # Next.js
    ├── CLAUDE.md       # Frontend-specific (imports root)
    ├── app/
    └── ...
```
