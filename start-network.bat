@echo off
echo 🚀 Starting SAKATA INX Website with Network Access...
echo.

echo 📡 Detecting Network Configuration...
cd backend
node network-utils.js
echo.

echo 🖥️  Starting Backend Server (Network Accessible)...
start "Backend Server" cmd /k "node server-with-routes.js"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 🌐 Starting Frontend with Network Access...
cd ..
start "Frontend Server" cmd /k "npm run dev:network"

echo.
echo ✅ Both servers are starting!
echo 📱 Access from other devices using the Network IP shown above
echo 🔗 Frontend: http://[NETWORK_IP]:5173
echo 🔗 Backend:  http://[NETWORK_IP]:5002
echo.
echo Press any key to close this window...
pause > nul
