@echo off
echo =======================================================
echo   WORKPULSE - GOOGLE FIREBASE HOSTING PUBLISHER
echo =======================================================
echo.
echo Step 1: Building production frontend assets...
cd client
call npm run build
cd ..

echo.
echo Step 2: Logging in to Google Firebase...
echo (A browser window will open for you to sign in with your Google account)
call npx --yes firebase-tools login

echo.
echo Step 3: Initializing / Deploying to Google Firebase Hosting...
call npx --yes firebase-tools init hosting --project workpulse-enterprise
call npx --yes firebase-tools deploy --only hosting

echo.
echo =======================================================
echo   PUBLISH COMPLETE! Your app is now live on Google!
echo =======================================================
pause

