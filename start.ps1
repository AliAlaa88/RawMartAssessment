# PowerShell script to start backend and frontend

Write-Host "Starting RawMart Development Environment..." -ForegroundColor Cyan

# Start backend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
    Set-Location '$PSScriptRoot\backend'
    Write-Host 'Installing PHP dependencies...' -ForegroundColor Yellow
    composer install
    Write-Host 'Starting Laravel server...' -ForegroundColor Green
    php artisan serve
"@

# Start frontend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
    Set-Location '$PSScriptRoot\frontend'
    Write-Host 'Installing npm dependencies...' -ForegroundColor Yellow
    npm install
    Write-Host 'Starting Vite dev server...' -ForegroundColor Green
    npm run dev
"@

Write-Host "Both servers starting in separate terminals!" -ForegroundColor Green
