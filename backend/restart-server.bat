@echo off
echo ====================================
echo Restarting Backend Server
echo ====================================
echo.

echo Step 1: Killing any process on port 5002...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5002" ^| find "LISTENING"') do (
    echo Found process %%a on port 5002
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

echo Step 2: Starting backend server...
echo.
cd /d "%~dp0"
node server-with-routes.js

pause
