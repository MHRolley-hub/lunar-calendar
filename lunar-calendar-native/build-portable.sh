#!/bin/bash
# Portable build script - NO ADMIN REQUIRED!
# Everything installs to user directory

set -e

echo "🌙 Vietnamese Lunar Calendar - Portable Build (No Admin!)"
echo "========================================================"
echo ""

BUILD_DIR="$HOME/lunar-calendar-build"
ANDROID_SDK="$BUILD_DIR/android-sdk"
ANDROID_CMDLINE_TOOLS="$ANDROID_SDK/cmdline-tools/latest"

echo "📁 Build directory: $BUILD_DIR"
echo ""

# Create build directory
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

# Step 1: Check/Download Android Command Line Tools
echo "📦 Step 1: Android Command Line Tools"
if [ ! -f "$ANDROID_CMDLINE_TOOLS/bin/sdkmanager" ]; then
    echo "  Downloading Android command line tools..."
    curl -o cmdlinetools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip

    mkdir -p "$ANDROID_SDK/cmdline-tools"
    unzip -q cmdlinetools.zip -d "$ANDROID_SDK/cmdline-tools"
    rm cmdlinetools.zip

    # Reorganize structure
    mkdir -p "$ANDROID_SDK/cmdline-tools/latest"
    mv "$ANDROID_SDK/cmdline-tools/cmdline-tools"/* "$ANDROID_SDK/cmdline-tools/latest/" 2>/dev/null || true
    rmdir "$ANDROID_SDK/cmdline-tools/cmdline-tools" 2>/dev/null || true

    echo "  ✅ Downloaded"
else
    echo "  ✅ Already installed"
fi

# Set environment
export ANDROID_HOME="$ANDROID_SDK"
export PATH="$PATH:$ANDROID_CMDLINE_TOOLS/bin:$ANDROID_SDK/platform-tools:$ANDROID_SDK/build-tools/34.0.0"

# Step 2: Accept licenses and install SDK packages
echo ""
echo "📦 Step 2: Android SDK Packages"
if [ ! -d "$ANDROID_SDK/platforms/android-34" ]; then
    echo "  Installing SDK packages..."
    yes | "$ANDROID_CMDLINE_TOOLS/bin/sdkmanager" --licenses > /dev/null 2>&1 || true
    "$ANDROID_CMDLINE_TOOLS/bin/sdkmanager" "platform-tools" "platforms;android-34" "build-tools;34.0.0"
    echo "  ✅ Installed"
else
    echo "  ✅ Already installed"
fi

# Step 3: Return to app directory
echo ""
echo "📦 Step 3: Building APK"
cd "$(dirname "$0")"

# Install npm dependencies
if [ ! -d "node_modules" ]; then
    echo "  Installing npm dependencies..."
    npm install
fi

# Bundle JavaScript
echo "  Bundling JavaScript..."
mkdir -p android/app/src/main/assets
npx react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android/app/src/main/assets/index.android.bundle \
    --assets-dest android/app/src/main/res/ > /dev/null 2>&1

# Create local.properties with SDK location
echo "sdk.dir=$ANDROID_SDK" > android/local.properties

# Build APK
echo "  Building APK (this takes 2-5 minutes)..."
cd android
ANDROID_HOME="$ANDROID_SDK" ./gradlew assembleRelease

if [ $? -eq 0 ]; then
    cd ..
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "📱 Your APK is ready:"
    echo "   $(pwd)/android/app/build/outputs/apk/release/app-release.apk"
    echo ""
    echo "📦 APK Size: $(du -h android/app/build/outputs/apk/release/app-release.apk | cut -f1)"
    echo ""
    echo "Next steps:"
    echo "1. Transfer APK to your Android phone"
    echo "2. Install the APK"
    echo "3. Add widgets to home screen!"
    echo ""
else
    echo ""
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
