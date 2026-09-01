$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $projectRoot "public\assets\images"

New-Item -ItemType Directory -Force -Path $destination | Out-Null

$images = @(
    @{ Source = "Home page picture.jpg"; Target = "home-banner.jpg" },
    @{ Source = "Homepage 2.jpg"; Target = "professional-headshot.jpg" },
    @{ Source = "Image 2.jpg"; Target = "about-portrait.jpg" },
    @{ Source = "IMG_0722.JPG"; Target = "gallery-academic.jpg" },
    @{ Source = "IMG_0728.JPG"; Target = "gallery-scholarship.jpg" },
    @{ Source = "Multiplymasters.jpg"; Target = "multiply-masters.jpg" },
    @{ Source = "Naija-trivial.jpg"; Target = "naija-trivia.jpg" }
)

$missing = @()

foreach ($image in $images) {
    $sourcePath = Join-Path $projectRoot $image.Source
    $targetPath = Join-Path $destination $image.Target

    if (-not (Test-Path $sourcePath)) {
        $missing += $image.Source
        continue
    }

    Copy-Item -Force $sourcePath $targetPath
    Write-Host "Copied $($image.Source) -> public/assets/images/$($image.Target)"
}

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "The following source images were not found in the project root:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host "Restore those files before deploying." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "All production image assets are ready." -ForegroundColor Green
