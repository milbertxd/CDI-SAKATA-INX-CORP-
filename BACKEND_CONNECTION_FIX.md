# 🔧 Backend Connection Troubleshooting Guide

## ❌ Problem: Frontend Cannot Connect to Backend

### ✅ SOLUTION - Follow These Steps:

---

## 🎯 STEP 1: Kill Any Process on Port 5002

**Open Command Prompt as Administrator** and run:

```cmd
netstat -ano | findstr :5002
```

This shows which process is using port 5002. Then kill it:

```cmd
taskkill /F /PID <process_id>
```

**OR** use the provided script:
```cmd
cd backend
restart-server.bat
```

---

## 🎯 STEP 2: Verify Backend .env File

Check `backend\.env` file has:

```properties
NODE_ENV=development
PORT=5002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_news
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:8080
```

**Important:** CORS_ORIGIN must be `http://localhost:8080` (your frontend port)

---

## 🎯 STEP 3: Start Backend Properly

```cmd
cd backend
node server-with-routes.js
```

**You should see:**
```
✅ Connected to MySQL database
📁 Static files from: C:\...\backend\public\uploads
📁 Public files from: C:\...\public
🚀 Starting server with router structure...
🔐 CORS allowed origins: [ 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:8080' ]
🌍 Environment: development
🎉 SERVER STARTED WITH ROUTER STRUCTURE!
🌐 Server running on:
   📍 Local: http://localhost:5002
   📍 Network: http://192.168.x.x:5002
```

---

## 🎯 STEP 4: Test Backend is Working

**Open a new terminal/command prompt:**

```cmd
curl http://localhost:5002/test
```

**Expected response:**
```json
{"message":"🎉 SERVER STARTED WITH ROUTER STRUCTURE!"}
```

**Or open in browser:**
```
http://localhost:5002/test
```

---

## 🎯 STEP 5: Check Frontend Configuration

**Open browser console (F12) on your frontend:**

You should see:
```
🔧 API Configuration: {
  baseUrl: "http://localhost:5002",
  environment: "development"
}
```

If you see a different URL, check your `.env.development` file.

---

## 🎯 STEP 6: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the Refresh button
3. Click "Empty Cache and Hard Reload"
4. Try again

---

## 🎯 STEP 7: Check for CORS Errors

**Open browser console (F12):**

❌ **If you see:** `Access to fetch at 'http://localhost:5002/api/...' from origin 'http://localhost:8080' has been blocked by CORS policy`

**Solution:**
1. Stop backend server (Ctrl+C)
2. Verify `backend\.env` has `CORS_ORIGIN=http://localhost:8080`
3. Restart backend: `node server-with-routes.js`

---

## 🔍 COMMON ISSUES & FIXES

### Issue 1: Port 5002 Already in Use
**Error:** `❌ Port 5002 is already in use!`

**Fix:**
```cmd
# Find the process
netstat -ano | findstr :5002

# Kill it (replace 1234 with actual PID)
taskkill /F /PID 1234

# Or use the restart script
cd backend
restart-server.bat
```

---

### Issue 2: Database Connection Failed
**Error:** `❌ Database connection failed`

**Fix:**
1. Make sure XAMPP MySQL is running
2. Check database exists:
   ```cmd
   mysql -u root -p
   SHOW DATABASES;
   USE db_news;
   SHOW TABLES;
   ```

---

### Issue 3: CORS Error
**Error:** `blocked by CORS policy`

**Fix:**
1. Open `backend\.env`
2. Change: `CORS_ORIGIN=http://localhost:8080`
3. Restart backend server
4. Clear browser cache (Ctrl+Shift+Delete)

---

### Issue 4: Backend Starts but Frontend Gets 404
**Error:** `GET http://localhost:5002/api/news 404 (Not Found)`

**Fix:**
1. Check you're running `server-with-routes.js` not `index.js`
2. Verify routes are loaded:
   ```
   ✅ Should see: "🎉 SERVER STARTED WITH ROUTER STRUCTURE!"
   ❌ Wrong: "UNIFIED SERVER STARTED"
   ```

---

### Issue 5: Connection Refused
**Error:** `net::ERR_CONNECTION_REFUSED`

**Fix:**
1. Backend is not running - start it:
   ```cmd
   cd backend
   node server-with-routes.js
   ```
2. Check firewall is not blocking port 5002
3. Try accessing: http://127.0.0.1:5002/test

---

### Issue 6: Wrong API URL
**Problem:** Frontend connecting to wrong URL

**Fix:**
1. Check browser console for: `🔧 API Configuration`
2. Should show: `http://localhost:5002`
3. If wrong, check `.env.development`:
   ```
   VITE_API_URL=http://localhost:5002
   ```
4. Restart frontend: `npm run dev`

---

## 🧪 COMPLETE TEST CHECKLIST

Run these tests in order:

### ✅ 1. Backend Test
```cmd
cd backend
node server-with-routes.js
```
**Expected:** Server starts without errors

### ✅ 2. API Test
```cmd
curl http://localhost:5002/test
```
**Expected:** `{"message":"🎉 SERVER STARTED WITH ROUTER STRUCTURE!"}`

### ✅ 3. Database Test
```cmd
curl http://localhost:5002/api/news
```
**Expected:** JSON array (even if empty: `[]`)

### ✅ 4. CORS Test
Open browser to: `http://localhost:8080`
Open Console (F12)
**Expected:** No CORS errors

### ✅ 5. Frontend API Test
In browser console, run:
```javascript
fetch('http://localhost:5002/api/news')
  .then(r => r.json())
  .then(d => console.log('✅ API works!', d))
  .catch(e => console.error('❌ API error:', e))
```
**Expected:** `✅ API works!`

---

## 🚀 QUICK FIX - START FRESH

If nothing works, follow these steps:

```cmd
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Navigate to project
cd "C:\Users\LENOVO\Downloads\CDI Sakata Inx Corp"

# 3. Start backend
cd backend
node server-with-routes.js

# 4. Open NEW terminal, start frontend
cd ..
npm run dev
```

---

## 📞 Still Not Working?

### Check These Files:

1. **`backend\.env`** - CORS_ORIGIN=http://localhost:8080
2. **`.env.development`** - VITE_API_URL=http://localhost:5002
3. **`vite.config.ts`** - port: 8080
4. **`backend\server-with-routes.js`** - PORT = 5002

### Debug Commands:

```cmd
# Show what's running on port 5002
netstat -ano | findstr :5002

# Show what's running on port 8080
netstat -ano | findstr :8080

# Test backend directly
curl http://localhost:5002/test

# Show environment variables
cd backend
node -e "require('dotenv').config(); console.log(process.env.CORS_ORIGIN)"
```

---

## ✅ SUCCESS INDICATORS

When everything works, you should see:

### Backend Terminal:
```
🎉 SERVER STARTED WITH ROUTER STRUCTURE!
🌐 Server running on:
   📍 Local: http://localhost:5002
```

### Frontend Browser Console:
```
🔧 API Configuration: { baseUrl: "http://localhost:5002", environment: "development" }
```

### No Errors:
- No CORS errors
- No connection refused errors
- No 404 errors on API calls

---

**Need more help? Check the network tab in browser DevTools (F12) to see the exact error.**
