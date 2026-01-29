# SPECS (JSPOT)

## 1) Like system

### User likes
- User can like a store only once
- Unlike is NOT required (one-way action)
- Data model:
  - `user_likes(user_id, store_id)` with unique constraint
  - `stores.likes_count`: cached count of user_likes
  - `stores.admin_likes`: manual boost by admin

### Display
- Total likes = likes_count + admin_likes (computed, no separate column)

## 2) Admin boost (paid/subscription)

- Admin can increase admin_likes for a store (for paying customers)
- Optional audit log table:
  - `store_like_adjustments(store_id, delta, reason, created_by_admin_id, ...)`

## 3) Role granting + Login URL issuance

### Flow
1. User registers (email)
2. Admin manually grants role: influencer or store
3. Admin issues login URL (magic link) for influencer/store portal

### Tables
- `user_access_grants(user_id, type, status, granted_by_admin_id, granted_at, ...)`
  - unique(user_id, type)
- `user_login_links(user_id, purpose, token_hash, expires_at, consumed_at, ...)`
  - token is stored as hash for security
  - token_hash unique

## 4) Geo search (3km)

- stores has latitude/longitude (decimal(9,6), decimal(10,6))
- Query strategy: bounding box → haversine distance calc
- Index: `index(latitude, longitude)` for bbox filter

### Bounding box calculation
```
lat_min = center_lat - (distance_km / 111)
lat_max = center_lat + (distance_km / 111)
lng_min = center_lng - (distance_km / (111 * cos(center_lat)))
lng_max = center_lng + (distance_km / (111 * cos(center_lat)))
```

## 5) View history (max 30, supports guest)

### Actor key strategy
- `actor_key = "U:{user_id}"` for logged-in users
- `actor_key = "V:{visitor_id}"` for guests (visitor_id stored in cookie by Next.js)

### Table: store_view_histories
- store_id
- actor_key
- user_id (nullable, for faster query when user is known)
- visitor_id (nullable, ULID, for faster query when guest)
- last_viewed_at
- view_count (default 1)
- timestamps

### Indexes
- unique(actor_key, store_id)
- index(actor_key, last_viewed_at) - for retrieving user's history
- index(user_id, last_viewed_at) - for logged-in user query
- index(visitor_id, last_viewed_at) - for guest query

### Prune strategy
- Keep only latest 30 per actor
- Implemented in application layer (on insert, delete oldest if count > 30)

## 6) Lines & stations

- 2 lines, stations belong to a line
- `store_stations` ties store to stations

### Unique strategy
- Prefer `unique(line_id, slug)` over `unique(slug)` to avoid collisions across lines
- Migration: drop `stations_slug_unique`, add `stations_line_id_slug_unique`
