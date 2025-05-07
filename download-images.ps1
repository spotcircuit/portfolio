# Script to download images for portfolio projects

$imageDir = ".\public\images"
$imagesToDownload = @(
    @{
        Name = "aibootcamp.jpg"
        Url = "https://aibootcamp.lexduo.ai/og-image.jpg"
        Fallback = "https://aibootcamp.lexduo.ai/favicon.ico"
    },
    @{
        Name = "roofmaster.jpg"
        Url = "https://roofmaster-lemon.vercel.app/og-image.jpg"
        Fallback = "https://roofmaster-lemon.vercel.app/dashboard/screenshot.png"
    },
    @{
        Name = "cohertly.jpg"
        Url = "https://cohertly.vercel.app/og-image.jpg"
        Fallback = "https://cohertly.vercel.app/logo.png"
    },
    @{
        Name = "househappy.jpg"
        Url = "https://househappy.vercel.app/og-image.jpg"
        Fallback = "https://househappy.vercel.app/logo.png"
    }
)

# Create images directory if it doesn't exist
if (-not (Test-Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force
}

# Function to download image
function Download-Image {
    param (
        [string]$Url,
        [string]$OutputPath
    )
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "Successfully downloaded: $Url to $OutputPath"
        return $true
    }
    catch {
        Write-Host "Failed to download: $Url. Error: $_"
        return $false
    }
}

# Download each image
foreach ($image in $imagesToDownload) {
    $outputPath = Join-Path $imageDir $image.Name
    
    Write-Host "Attempting to download $($image.Name)..."
    
    # Try primary URL
    $success = Download-Image -Url $image.Url -OutputPath $outputPath
    
    # If primary fails, try fallback
    if (-not $success) {
        Write-Host "Trying fallback URL for $($image.Name)..."
        $success = Download-Image -Url $image.Fallback -OutputPath $outputPath
    }
    
    # If both fail, create a placeholder
    if (-not $success) {
        Write-Host "Creating placeholder for $($image.Name)..."
        # Create a simple colored rectangle as placeholder
        $placeholderHtml = @"
        <!DOCTYPE html>
        <html>
        <head>
            <title>Placeholder</title>
            <style>
                body, html { margin: 0; padding: 0; height: 100%; }
                .placeholder { 
                    width: 100%; 
                    height: 100%; 
                    background: linear-gradient(45deg, #3498db, #2ecc71);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="placeholder">$($image.Name.Replace('.jpg', ''))</div>
        </body>
        </html>
"@
        $tempHtmlPath = "temp_placeholder.html"
        $placeholderHtml | Out-File -FilePath $tempHtmlPath
        
        # Use a default image if available or create a simple colored rectangle
        $defaultImage = Join-Path $imageDir "sclogo.png"
        if (Test-Path $defaultImage) {
            Copy-Item $defaultImage $outputPath
            Write-Host "Used default image for $($image.Name)"
        }
        else {
            Write-Host "No default image available for $($image.Name)"
        }
        
        Remove-Item $tempHtmlPath -Force
    }
}

Write-Host "Image download process completed!"
