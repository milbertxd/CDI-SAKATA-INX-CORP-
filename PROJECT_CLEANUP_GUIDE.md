# Project Structure - Essential Files Only

## ✅ ESSENTIAL FILES TO KEEP

### Backend (Core Server Files)
- `backend/server-with-routes.js` - **YOUR MAIN SERVER** ⭐
- `backend/db.js` - Database connection
- `backend/package.json` - Backend dependencies
- `backend/.env` - Environment variables

### Backend Routes (API Endpoints)
- `backend/routes/auth.js` - Authentication routes
- `backend/routes/careers.js` - Career/jobs API
- `backend/routes/certificates.js` - Certificates API
- `backend/routes/news.js` - News API
- `backend/routes/products.js` - Products API
- `backend/routes/upload.js` - File upload API

### Database Setup Files
- `backend/setup-certificates.js` - Sets up certificates table
- `backend/setup-products-table.js` - Sets up products table
- `backend/setup-careers-table.js` - Sets up careers table
- `backend/create-certificates-table.sql` - SQL for certificates
- `backend/create-products-table.sql` - SQL for products
- `backend/create-actual-products-table.sql` - Actual products table
- `backend/database-update.sql` - Database updates

### Frontend (React App)
- `src/` - All React components and pages
- `public/` - Static assets (images, logos, etc.)
- `index.html` - Main HTML file
- `package.json` - Frontend dependencies
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS config
- `tsconfig.json` - TypeScript config

### Configuration Files
- `.env` - Environment variables
- `.gitignore` - Git ignore rules
- `components.json` - UI components config
- `postcss.config.js` - PostCSS config
- `eslint.config.js` - ESLint config

## 🗑️ FILES THAT WILL BE REMOVED

### Duplicate/Old Server Files
- `backend/index.js`
- `backend/server.js`
- `backend/server-https.js`
- `backend/minimal-server.js`
- `backend/simple-server.js`
- `backend/ultra-simple.js`
- `backend/debug-*.js`

### Test Files
- `backend/test-*.js` (all test files)
- `backend/simple-upload-test.js`

### Diagnostic Files
- `backend/diagnose*.js`
- `backend/check-*.js`

### Old Setup/Utility Files
- `backend/fix-*.js`
- `backend/reset-admin.js`
- `backend/network-utils.js`
- Various `.bat` files

### Unused Directories
- `draft/`
- `new/`
- `-p/`

## 🚀 HOW TO RUN AFTER CLEANUP

1. **Start Backend Server:**
   ```bash
   cd backend
   node server-with-routes.js
   ```

2. **Start Frontend (in another terminal):**
   ```bash
   npm run dev
   ```

## 📝 NOTES

- Your main server (`server-with-routes.js`) will continue to work exactly as before
- All API endpoints will remain functional
- Database setup will still work automatically
- Frontend React app will be unaffected
- Only unnecessary/duplicate files are removed

**Run the cleanup script when you're ready:** `cleanup-project.bat`
