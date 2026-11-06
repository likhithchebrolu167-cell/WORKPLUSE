Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  WORKPULSE - GOOGLE FIREBASE & CLOUD PUBLISHER" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Building production bundle..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\client"
npm.cmd run build
Set-Location "$PSScriptRoot"

Write-Host "`n[2/3] Authenticating with Google..." -ForegroundColor Yellow
Write-Host "A Google login tab will open in your browser. Please approve access." -ForegroundColor Gray
npx.cmd --yes firebase-tools login

Write-Host "`n[3/3] Deploying to Google Firebase Global CDN..." -ForegroundColor Yellow
npx.cmd --yes firebase-tools deploy --only hosting

Write-Host "`n=======================================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETE! Your site is live on Google!" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green

