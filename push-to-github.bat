@echo off
echo ========================================
echo GitHub Push Helper
echo ========================================
echo.

echo Step 1: Checking Git Status...
echo.
git status
echo.
echo ========================================
echo.

echo IMPORTANT: Check the list above!
echo.
echo ❌ Make sure these are NOT listed:
echo    - backend/.env (with real passwords)
echo    - node_modules/
echo    - dist/
echo.
echo ✅ These are OK to push:
echo    - backend/.env.production (template)
echo    - .env.development (template)
echo    - Source code files (.js, .ts, .tsx)
echo    - Documentation (.md files)
echo.

pause
echo.

echo Step 2: Adding all changes...
git add .
echo.

echo Step 3: Committing changes...
git commit -m "Production ready: Fix CORS config, add environment variables, and deployment guides"
echo.

echo Step 4: Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo Done! Check GitHub to verify.
echo https://github.com/milbertxd/CDI-SAKATA-INX-CORP-
echo ========================================
echo.

pause
