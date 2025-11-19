#!/bin/bash
# Build script for Vietnamese Lunar Calendar Android App
# This script builds the APK using Docker (no Android SDK required on host)

set -e

echo "🌙 Vietnamese Lunar Calendar - Docker Build Script"
echo "=================================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker from: https://www.docker.com/get-started"
    exit 1
fi

echo "✅ Docker found"
echo ""

# Build Docker image
echo "📦 Building Docker image (this may take 5-10 minutes first time)..."
docker build -t lunar-calendar-builder .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker image built successfully"
echo ""

# Create output directory
mkdir -p output

# Run the build
echo "🔨 Building APK..."
docker run --rm -v "$(pwd)/output:/output" lunar-calendar-builder

if [ $? -ne 0 ]; then
    echo "❌ APK build failed"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📱 Your APK is ready at: output/app-release.apk"
echo ""
echo "Next steps:"
echo "1. Transfer output/app-release.apk to your Android phone"
echo "2. Open the APK file on your phone to install"
echo "3. Add widgets to your home screen!"
echo ""
