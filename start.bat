@echo off
setlocal
echo ===================================================
echo   Starting Major System Mnemonic Training App
echo ===================================================

if not exist "node_modules\" (
    echo [INFO] Installing required dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b %errorlevel%
    )
)

echo [INFO] Launching Vite development server...
call npm run dev -- --open
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start dev server.
    pause
    exit /b %errorlevel%
)

pause

