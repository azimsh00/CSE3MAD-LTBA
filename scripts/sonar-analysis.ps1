# SonarCloud Local Analysis Script for Windows PowerShell
# Make sure you have sonar-scanner installed and in your PATH

Write-Host "🧪 Running tests with coverage..." -ForegroundColor Yellow
npm run test:coverage

Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint

Write-Host "📊 Starting SonarCloud analysis..." -ForegroundColor Yellow
sonar-scanner `
  "-Dsonar.projectKey=cse3mad-ltba_cse3mad-ltba" `
  "-Dsonar.organization=cse3mad-ltba" `
  "-Dsonar.host.url=https://sonarcloud.io" `
  "-Dsonar.login=$env:SONAR_TOKEN"

Write-Host "✅ SonarCloud analysis complete!" -ForegroundColor Green
Write-Host "Check your results at: https://sonarcloud.io/dashboard?id=cse3mad-ltba_cse3mad-ltba" -ForegroundColor Cyan