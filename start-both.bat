@echo off
echo ============================================
echo  Mini Event Finder - Starting Backend
echo ============================================
echo.
cd backend
start cmd /k "npm run dev"
echo Backend server starting on http://localhost:4000
echo.
timeout /t 3 /nobreak >nul
echo ============================================
echo  Mini Event Finder - Starting Frontend
echo ============================================
echo.
cd ..\frontend
start cmd /k "npm run dev"
echo Frontend app starting on http://localhost:5173
echo.
echo ============================================
echo  Both servers are starting!
echo  Backend: http://localhost:4000
echo  Frontend: http://localhost:5173
echo ============================================
pause
