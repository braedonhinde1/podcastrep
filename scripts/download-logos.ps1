# Download brand logos for the PodcastRep brand strip
# Run from the podcastrep project root:
#   powershell -ExecutionPolicy Bypass -File scripts/download-logos.ps1

$brandsDir = Join-Path $PSScriptRoot "..\public\brands"
if (-not (Test-Path $brandsDir)) {
    New-Item -ItemType Directory -Path $brandsDir -Force | Out-Null
}

# Brand logo sources - using press kits and CDN URLs where available
$logos = @{
    "shopify"           = "https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg"
    "betterhelp"        = "https://www.betterhelp.com/brand/logo.svg"
    "draftkings"        = "https://www.draftkings.com/images/logos/dk-logo-green.svg"
    "fanduel"           = "https://www.fanduel.com/static/images/logos/fanduel-logo.svg"
    "hellofresh"        = "https://img.hellofresh.com/f_auto,fl_lossy,q_auto/hellofresh_s2/image/hellofresh-logo.svg"
    "factor"            = "https://factor75.com/images/logo.svg"
    "prizepicks"        = "https://prizepicks.com/images/logo.svg"
    "acorns"            = "https://www.acorns.com/images/acorns-logo.svg"
    "greenlight"        = "https://greenlight.com/static/images/logo.svg"
    "quince"            = "https://www.onequince.com/images/logo.svg"
    "aura-frames"       = "https://www.auraframes.com/images/logo.svg"
    "underdog-fantasy"  = "https://underdogfantasy.com/images/logo.svg"
    "dutch-pets"        = "https://www.dutch.com/images/logo.svg"
    "rula"              = "https://www.rula.com/images/logo.svg"
}

Write-Host "`n=== PodcastRep Brand Logo Downloader ===" -ForegroundColor Cyan
Write-Host "Downloading logos to: $brandsDir`n"

$succeeded = 0
$failed = @()

foreach ($brand in $logos.Keys | Sort-Object) {
    $url = $logos[$brand]
    $ext = if ($url -match '\.svg') { ".svg" } elseif ($url -match '\.png') { ".png" } else { ".svg" }
    $outFile = Join-Path $brandsDir "$brand$ext"

    Write-Host "  Downloading $brand..." -NoNewline
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $fileSize = (Get-Item $outFile).Length
        if ($fileSize -gt 100) {
            Write-Host " OK ($fileSize bytes)" -ForegroundColor Green
            $succeeded++
        } else {
            Write-Host " TOO SMALL - probably failed" -ForegroundColor Yellow
            Remove-Item $outFile -Force
            $failed += $brand
        }
    } catch {
        Write-Host " FAILED" -ForegroundColor Red
        $failed += $brand
    }
}

Write-Host "`n--- Results ---"
Write-Host "  Downloaded: $succeeded / $($logos.Count)" -ForegroundColor $(if ($succeeded -eq $logos.Count) { "Green" } else { "Yellow" })

if ($failed.Count -gt 0) {
    Write-Host "`n  Failed brands (download manually):" -ForegroundColor Yellow
    foreach ($f in $failed) {
        Write-Host "    - $f" -ForegroundColor Yellow
    }
    Write-Host "`n  For failed logos, search '[brand name] logo transparent PNG' and save to:"
    Write-Host "    $brandsDir" -ForegroundColor Cyan
    Write-Host "  Name files as: brandname.svg or brandname.png (lowercase, hyphens for spaces)"
}

Write-Host "`nDone!`n"
