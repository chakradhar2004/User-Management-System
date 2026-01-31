# Test production backend
Write-Host "Testing backend health..." -ForegroundColor Yellow

try {
    # Test health endpoint
    $healthResponse = Invoke-RestMethod -Uri "https://user-management-system-ldg4.onrender.com/health" -Method GET
    Write-Host "Backend Health:" $healthResponse -ForegroundColor Green
    
    # Create admin user
    Write-Host "Creating admin user..." -ForegroundColor Yellow
    $adminData = @{
        name = "Admin User"
        email = "admin@example.com"
        password = "admin123"
        role = "admin"
    } | ConvertTo-Json
    
    $signupResponse = Invoke-RestMethod -Uri "https://user-management-system-ldg4.onrender.com/api/auth/signup" -Method POST -Body $adminData -ContentType "application/json"
    Write-Host "Admin user created:" $signupResponse -ForegroundColor Green
    
    # Test login
    Write-Host "Testing admin login..." -ForegroundColor Yellow
    $loginData = @{
        email = "admin@example.com"
        password = "admin123"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "https://user-management-system-ldg4.onrender.com/api/auth/login" -Method POST -Body $loginData -ContentType "application/json"
    Write-Host "Admin login successful:" $loginResponse -ForegroundColor Green
    
} catch {
    Write-Host "Error:" $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "Status:" $_.Exception.Response.StatusCode -ForegroundColor Red
    }
}
