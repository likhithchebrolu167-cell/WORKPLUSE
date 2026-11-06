@echo off
title WORKPULSE Production Server
echo ========================================================
echo   WORKPULSE - SMART EMPLOYEE PRODUCTIVITY TRACKER
echo   Production Full-Stack Unified Server (Port 5000)
echo ========================================================
echo.
cd /d "%~dp0"
echo [1/2] Checking production client build...
if not exist "client\dist\index.html" (
    echo Building frontend bundle...
    cd client && npm run build && cd ..
)
echo.
echo [2/2] Launching WorkPulse Enterprise Production Server...
set NODE_ENV=production
set PORT=5000
node server/server.js
pause

