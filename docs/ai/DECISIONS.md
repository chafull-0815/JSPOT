# DECISIONS

## 2026-01-29: actor_key for view history

### Context
Guest users need to have their view history preserved without login. Need to track history by some identifier.

### Options
1. Separate tables for user vs guest history
2. Single table with actor_key pattern
3. Single table with both user_id and visitor_id (nullable)

### Decision
Option 2 + 3 hybrid: Use actor_key ("U:{user_id}" or "V:{visitor_id}") as primary identifier, plus separate user_id/visitor_id columns for faster direct queries.

### Consequences
- More flexible querying
- Slightly more storage (redundant data)
- Application must maintain consistency between actor_key and user_id/visitor_id

---

## 2026-01-29: stations unique constraint

### Context
Current: stations.slug has unique constraint. Problem: same slug might exist on different lines.

### Options
1. Keep unique(slug) - require globally unique slugs
2. Change to unique(line_id, slug) - allow same slug on different lines

### Decision
Option 2: unique(line_id, slug)

### Consequences
- More flexible naming
- Requires migration to drop old unique and add new composite unique
- Frontend/API may need to use line_id + slug for lookup instead of just slug
