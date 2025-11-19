@echo off
REM Portable build script for Windows - NO ADMIN REQUIRED!
REM Everything installs to user directory

setlocal EnableDelayedExpansion

echo.
echo Vietnamese Lunar Calendar - Portable Build (No Admin!)
echo ========================================================
echo.

set BUILD_DIR=%USERPROFILE%\lunar-calendar-build
set ANDROID_SDK=%BUILD_DIR%\android-sdk
set ANDROID_CMDLINE_TOOLS=%ANDROID_SDK%\cmdline-tools\latest

echo Build directory: %BUILD_DIR%
echo.

REM Create build directory
if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"
cd /d "%BUILD_DIR%"

REM Step 1: Check/Download Android Command Line Tools
echo Step 1: Android Command Line Tools
if not exist "%ANDROID_CMDLINE_TOOLS%\bin\sdkmanager.bat" (
    echo   Downloading Android command line tools...
    powershell -Command "& {Invoke-WebRequest -Uri 'https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip' -OutFile 'cmdlinetools.zip'}"

    mkdir "%ANDROID_SDK%\cmdline-tools" 2>nul
    powershell -Command "& {Expand-Archive -Path 'cmdlinetools.zip' -DestinationPath '%ANDROID_SDK%\cmdline-tools' -Force}"
    del cmdlinetools.zip

    REM Reorganize structure
    mkdir "%ANDROID_SDK%\cmdline-tools\latest" 2>nul
    move "%ANDROID_SDK%\cmdline-tools\cmdline-tools\*" "%ANDROID_SDK%\cmdline-tools\latest\" >nul 2>&1
    rmdir "%ANDROID_SDK%\cmdline-tools\cmdline-tools" 2>nul

    echo   Downloaded
) else (
    echo   Already installed
)

REM Set environment
set ANDROID_HOME=%ANDROID_SDK%
set PATH=%PATH%;%ANDROID_CMDLINE_TOOLS%\bin;%ANDROID_SDK%\platform-tools;%ANDROID_SDK%\build-tools\34.0.0

REM Step 2: Accept licenses and install SDK packages
echo.
echo Step 2: Android SDK Packages
if not exist "%ANDROID_SDK%\platforms\android-34" (
    echo   Installing SDK packages...
    echo y | "%ANDROID_CMDLINE_TOOLS%\bin\sdkmanager.bat" --licenses >nul 2>&1
    call "%ANDROID_CMDLINE_TOOLS%\bin\sdkmanager.bat" "platform-tools" "platforms;android-34" "build-tools;34.0.0"
    echo   Installed
) else (
    echo   Already installed
)

REM Step 3: Return to app directory and build
echo.
echo Step 3: Building APK
cd /d "%~dp0"

REM Install npm dependencies
if not exist "node_modules" (
    echo   Installing npm dependencies...
    call npm install
)

REM Bundle JavaScript
echo   Bundling JavaScript...
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"
call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android\app\src\main\assets\index.android.bundle --assets-dest android\app\src\main\res\ >nul 2>&1

REM Create local.properties with SDK location
echo sdk.dir=%ANDROID_SDK:\=/% > android\local.properties

REM Build APK
echo   Building APK (this takes 2-5 minutes)...
cd android
set ANDROID_HOME=%ANDROID_SDK%
call gradlew.bat assembleRelease

if !ERRORLEVEL! EQU 0 (
    cd ..
    echo.
    echo BUILD SUCCESSFUL!
    echo.
    echo Your APK is ready at:
    echo %CD%\android\app\build\outputs\apk\release\app-release.apk
    echo.
    echo Next steps:
    echo 1. Transfer APK to your Android phone
    echo 2. Install the APK
    echo 3. Add widgets to home screen!
    echo.
) else (
    echo.
    echo Build failed. Check the errors above.
    exit /b 1
)

endlocal
