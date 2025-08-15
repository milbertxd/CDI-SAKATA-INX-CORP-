@echo off
echo 🧹 Starting project cleanup...
echo.

REM Navigate to backend directory
cd /d "c:\Users\LENOVO\Downloads\CDI Sakata Inx Corp\backend"

echo 📂 Removing unnecessary server files...

REM Remove all the old/test/debug server files
if exist "index.js" del "index.js"
if exist "index.js.deleted" del "index.js.deleted"
if exist "server.js" del "server.js"
if exist "server.js.deleted" del "server.js.deleted"
if exist "server-https.js" del "server-https.js"
if exist "minimal-server.js" del "minimal-server.js"
if exist "minimal-upload-server.js" del "minimal-upload-server.js"
if exist "simple-server.js" del "simple-server.js"
if exist "simple-test-server.js" del "simple-test-server.js"
if exist "ultra-simple.js" del "ultra-simple.js"
if exist "debug-server.js" del "debug-server.js"
if exist "debug-complete.js" del "debug-complete.js"

echo 🧪 Removing test files...
if exist "test-api.js" del "test-api.js"
if exist "test-insert.js" del "test-insert.js"
if exist "test-minimal-server.js" del "test-minimal-server.js"
if exist "test-products.js" del "test-products.js"
if exist "test-server.js" del "test-server.js"
if exist "test-upload.js" del "test-upload.js"
if exist "test-uploads.js" del "test-uploads.js"
if exist "simple-upload-test.js" del "simple-upload-test.js"

echo 🔧 Removing diagnostic files...
if exist "diagnose.js" del "diagnose.js"
if exist "diagnose-products.js" del "diagnose-products.js"
if exist "check-certificates.js" del "check-certificates.js"
if exist "check-db-structure.js" del "check-db-structure.js"
if exist "check-db.js" del "check-db.js"

echo 🗄️ Removing old database setup files...
if exist "create-simple-certificates.js" del "create-simple-certificates.js"
if exist "create-simple-certificates-table.sql" del "create-simple-certificates-table.sql"
if exist "add-content-column.js" del "add-content-column.js"
if exist "add-content-field.js" del "add-content-field.js"
if exist "fix-and-start.js" del "fix-and-start.js"
if exist "fix-database.js" del "fix-database.js"
if exist "reset-admin.js" del "reset-admin.js"
if exist "update-news-schema.js" del "update-news-schema.js"

echo 📦 Removing old batch files...
if exist "generate-ssl.bat" del "generate-ssl.bat"
if exist "restart-server.bat" del "restart-server.bat"
if exist "start-server.bat" del "start-server.bat"
if exist "update-database.bat" del "update-database.bat"

echo 🌐 Removing network utilities (if not needed)...
if exist "network-utils.js" del "network-utils.js"

REM Navigate to project root
cd /d "c:\Users\LENOVO\Downloads\CDI Sakata Inx Corp"

echo 📁 Removing unnecessary directories...
if exist "draft" rmdir /s /q "draft"
if exist "new" rmdir /s /q "new"
if exist "-p" rmdir /s /q "-p"

echo 📄 Removing old batch files from root...
if exist "fix-hardcoded-urls.bat" del "fix-hardcoded-urls.bat"
if exist "start-all.bat" del "start-all.bat"
if exist "start-network.bat" del "start-network.bat"

echo.
echo ✅ Project cleanup completed!
echo.
echo 📋 KEPT ESSENTIAL FILES:
echo    - backend/server-with-routes.js (your main server)
echo    - backend/db.js
echo    - backend/routes/ directory (all route files)
echo    - backend/setup-*.js files (database setup)
echo    - backend/create-*-table.sql files
echo    - All package.json and configuration files
echo    - src/ directory (React frontend)
echo    - public/ directory (static assets)
echo.
echo 🗑️ REMOVED:
echo    - All old/duplicate server files
echo    - All test files
echo    - All diagnostic files
echo    - Unused directories (draft, new, -p)
echo    - Old batch files
echo.
pause
