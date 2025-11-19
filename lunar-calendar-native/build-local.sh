#!/bin/bash
# Local build script for Vietnamese Lunar Calendar Android App
# Prerequisites: Node.js, Java JDK 17, Android SDK

set -e

echo "🌙 Vietnamese Lunar Calendar - Local Build Script"
echo "================================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Install from: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js $(node --version)"

if ! command -v java &> /dev/null; then
    echo "❌ Java not found! Install JDK 17 from: https://adoptium.net/"
    exit 1
fi
echo "✅ Java $(java -version 2>&1 | grep version | cut -d'"' -f2)"

if [ -z "$ANDROID_HOME" ]; then
    echo "❌ ANDROID_HOME not set!"
    echo "Please set ANDROID_HOME to your Android SDK location:"
    echo "  export ANDROID_HOME=\$HOME/Android/Sdk"
    echo ""
    echo "Or install Android Studio from: https://developer.android.com/studio"
    exit 1
fi
echo "✅ ANDROID_HOME: $ANDROID_HOME"

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "📱 Bundling JavaScript..."
mkdir -p android/app/src/main/assets
npx react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android/app/src/main/assets/index.android.bundle \
    --assets-dest android/app/src/main/res/

if [ $? -ne 0 ]; then
    echo "❌ JavaScript bundling failed"
    exit 1
fi

echo ""
echo "🔨 Building APK..."
cd android

# Clean previous builds
./gradlew clean

# Build release APK
./gradlew assembleRelease

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

cd ..

echo ""
echo "✅ Build successful!"
echo ""
echo "📱 Your APK is at:"
echo "   android/app/build/outputs/apk/release/app-release.apk"
echo ""
echo "Next steps:"
echo "1. Transfer APK to your Android phone"
echo "2. Open the APK to install"
echo "3. Add widgets to home screen!"
echo ""
