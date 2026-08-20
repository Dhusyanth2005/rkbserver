## Plan: RKB Builders Backend - MongoDB Schema & API Implementation

**TL;DR**: Implement a complete backend for RKB Builders with 4 MongoDB collections (home_hero, works, about_hero, about_leadership), Cloudinary integration, JWT authentication for admin CMS, RESTful API endpoints, request validation (Mongoose + Zod), and database seeding.

---

### Steps

#### Phase 1: Project Structure & Configuration
1. **Create folder structure** - `src/models`, `src/routes`, `src/controllers`, `src/middleware`, `src/utils`, `src/config`, `src/validators`
2. **Update .env** - Add MongoDB URI, Cloudinary credentials, JWT secret, PORT
3. **Create config files** - `db.js` (MongoDB connection), `cloudinary.js` (Cloudinary config)

#### Phase 2: Mongoose Models (4 collections)
4. **HomeHero model** (`src/models/HomeHero.js`) - Singleton with video_light, video_dark, poster
5. **Work model** (`src/models/Work.js`) - Main collection with thumbnail, photos array, meta fields
6. **AboutHero model** (`src/models/AboutHero.js`) - Singleton with portrait, name, role, philosophy
7. **AboutLeadership model** (`src/models/AboutLeadership.js`) - Singleton with photo, credentials[], bio
8. **Admin/User model** (`src/models/Admin.js`) - For JWT authentication

#### Phase 3: Validation Schemas (Zod)
9. **Create Zod validators** (`src/validators/`) for each model's create/update operations

#### Phase 4: Controllers & Routes
10. **Auth controller/routes** - Register, login, token refresh, get profile
11. **HomeHero controller/routes** - GET (public), PUT (admin)
12. **Works controller/routes** - GET all (public), GET by slug (public), CRUD (admin)
13. **AboutHero controller/routes** - GET (public), PUT (admin)
14. **AboutLeadership controller/routes** - GET (public), PUT (admin)
15. **Cloudinary upload routes** - POST upload, DELETE destroy (admin)

#### Phase 5: Middleware
16. **Auth middleware** - JWT verification, role-based access
17. **Validation middleware** - Zod schema validation wrapper
18. **Error handling middleware** - Centralized error responses
19. **Rate limiting** - Basic rate limiting for API

#### Phase 6: Database Seeding
20. **Create seed script** (`src/utils/seed.js`) - Populate all 4 collections with sample data from schema plan

#### Phase 7: Integration & Testing
21. **Wire up all routes in index.js** - Mount routers, apply middleware
22. **Test all endpoints** - Verify CRUD operations, auth flow, Cloudinary uploads

---

### Relevant Files

**New files to create:**
- `src/config/db.js` — MongoDB connection with connection pooling
- `src/config/cloudinary.js` — Cloudinary v2 configuration
- `src/models/HomeHero.js` — Singleton hero schema
- `src/models/Work.js` — Works collection with indexes
- `src/models/AboutHero.js` — Singleton about hero schema
- `src/models/AboutLeadership.js` — Singleton leadership schema
- `src/models/Admin.js` — Admin user for JWT auth
- `src/validators/homeHeroValidator.js` — Zod schemas for hero
- `src/validators/workValidator.js` — Zod schemas for works
- `src/validators/aboutValidator.js` — Zod schemas for about pages
- `src/validators/authValidator.js` — Zod schemas for auth
- `src/controllers/authController.js` — Auth logic
- `src/controllers/homeHeroController.js` — Hero CRUD
- `src/controllers/workController.js` — Works CRUD
- `src/controllers/aboutController.js` — About pages CRUD
- `src/controllers/uploadController.js` — Cloudinary upload/delete
- `src/routes/authRoutes.js` — Auth endpoints
- `src/routes/homeHeroRoutes.js` — Hero endpoints
- `src/routes/workRoutes.js` — Works endpoints
- `src/routes/aboutRoutes.js` — About endpoints
- `src/routes/uploadRoutes.js` — Upload endpoints
- `src/middleware/auth.js` — JWT verification
- `src/middleware/validate.js` — Zod validation wrapper
- `src/middleware/errorHandler.js` — Global error handler
- `src/utils/seed.js` — Database seeding script
- `src/utils/cloudinary.js` — Cloudinary helper functions

**Files to modify:**
- `index.js` — Main entry point, mount all routes
- `package.json` — Add zod, multer, cloudinary dependencies
- `.env` — Add all required environment variables

---

### Verification

1. **Start server** - `npm run dev` runs without errors
2. **Health check** - `GET /api/health` returns 200
3. **Auth flow** - POST `/api/auth/register` → POST `/api/auth/login` → returns JWT
4. **Public endpoints** - GET `/api/hero`, `/api/works`, `/api/works/:slug`, `/api/about` return seeded data
5. **Admin endpoints** - PUT `/api/hero`, POST `/api/works`, PUT `/api/about/hero`, PUT `/api/about/leadership` work with valid JWT
6. **Cloudinary upload** - POST `/api/upload` with multipart/form-data returns Cloudinary URL
7. **Validation** - Invalid payloads return 400 with Zod error details
8. **Seed script** - `node src/utils/seed.js` populates all 4 collections correctly

---

### Decisions

- **Singleton pattern** for home_hero, about_hero, about_leadership using `findOneAndUpdate` with `upsert: true`
- **Works collection** serves both home carousel (thumbnail + meta) and works page (full photos array)
- **Cloudinary folder structure** as specified: `rkbsite/hero/`, `rkbsite/works/{slug}/`, `rkbsite/about/`
- **JWT in response body** (not cookie) - token returned in JSON response
- **Single JWT token** with 7-day expiry (no refresh token rotation)
- **No rate limiting** required
- **Zod for request validation**, Mongoose for data integrity
- **Indexes** on `works.id` (unique), `works.type + published + order`

---

### Further Considerations

1. **Image optimization** - Should we add Cloudinary transformation params (auto format, quality) to upload helper?
2. **Pagination** - Works list may need pagination for large datasets (add `page`, `limit` query params)
3. **Soft delete** - Add `deletedAt` field for works instead of hard delete?
4. **Audit logging** - Track who modified what and when for admin actions?

### Configuration Values (Confirmed)

- **CORS Origin**: `https://rkbsite.vercel.app` (production) + `http://localhost:3000` (local dev)
- **MongoDB URI**: `mongodb://localhost:27017/rkbbuilders` (local Compass)
- **JWT**: Single token, 7-day expiry, httpOnly cookie
- **Rate Limiting**: Not required