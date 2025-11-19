# Build Instructions - Vietnamese Lunar Calendar Android App

There are **3 ways** to build this app. Choose the method that works best for you:

---

## Method 1: Docker Build (Easiest - No Android SDK Required!)

**Best if:** You have Docker but don't want to install Android SDK

### Steps:

1. **Install Docker** (if not already installed):
   - **Mac/Windows**: https://www.docker.com/get-started
   - **Linux**: `sudo apt install docker.io` or `sudo yum install docker`

2. **Run the build script**:
   ```bash
   cd lunar-calendar-native
   ./build-docker.sh
   ```

3. **Get your APK**:
   ```
   output/app-release.apk
   ```

**Time**: 10-15 minutes (first build), 2-3 minutes (subsequent builds)

---

## Method 2: Local Build with Android Studio

**Best if:** You already have Android Studio installed

### Steps:

1. **Install Android Studio**: https://developer.android.com/studio

2. **Set environment variable**:

   **Mac/Linux:**
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   # or
   export ANDROID_HOME=$HOME/Android/Sdk  # Linux

   # Add to ~/.bashrc or ~/.zshrc to make permanent:
   echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
   ```

   **Windows (PowerShell):**
   ```powershell
   $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"

   # Make permanent:
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
   ```

3. **Run the build script**:
   ```bash
   cd lunar-calendar-native
   chmod +x build-local.sh
   ./build-local.sh
   ```

4. **Get your APK**:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

**Time**: 5-10 minutes

---

## Method 3: Manual Build (Step-by-Step)

**Best if:** You want full control or the scripts don't work

### Prerequisites:

- **Node.js 18+**: https://nodejs.org/
- **Java JDK 17**: https://adoptium.net/
- **Android SDK** (via Android Studio or command line tools)

### Steps:

1. **Install dependencies**:
   ```bash
   cd lunar-calendar-native
   npm install
   ```

2. **Bundle JavaScript**:
   ```bash
   mkdir -p android/app/src/main/assets

   npx react-native bundle \
     --platform android \
     --dev false \
     --entry-file index.js \
     --bundle-output android/app/src/main/assets/index.android.bundle \
     --assets-dest android/app/src/main/res/
   ```

3. **Build APK**:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```

4. **Find your APK**:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

**Time**: 5-10 minutes

---

## Troubleshooting

### "ANDROID_HOME is not set"

**Solution:**
```bash
# Find your Android SDK location:
# Usually at:
# - macOS: ~/Library/Android/sdk
# - Linux: ~/Android/Sdk
# - Windows: %LOCALAPPDATA%\Android\Sdk

# Set it:
export ANDROID_HOME=/path/to/your/android/sdk
```

### "SDK location not found"

**Solution:** Create `android/local.properties`:
```
sdk.dir=/path/to/your/android/sdk
```

### "Failed to install the following Android SDK packages"

**Solution:** Open Android Studio → SDK Manager → Install:
- Android SDK Platform 34
- Android SDK Build-Tools 34.0.0
- Android SDK Platform-Tools

### "Gradle build failed"

**Solution:**
```bash
cd android
./gradlew clean
./gradlew assembleRelease --stacktrace
```

### "npm install failed"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Docker build fails

**Solution:**
```bash
docker system prune -a  # Clean Docker cache
./build-docker.sh       # Try again
```

---

## After Building

### Installing on Your Phone:

1. **Transfer APK** to your phone (via USB, email, cloud, etc.)
2. **Enable "Unknown Sources"**:
   - Settings → Security → Unknown Sources (enable)
   - Or Settings → Apps → Special Access → Install unknown apps
3. **Open the APK file** on your phone
4. **Tap "Install"**
5. **Done!**

### Adding Widgets:

1. **Long-press** on your home screen
2. **Tap "Widgets"**
3. **Find "Vietnamese Lunar Calendar"**
4. **Drag** either:
   - 1x1 widget (compact)
   - 2x1 widget (with festival info)
5. **Enjoy!**

Widgets show:
- 🌙 Moon phase emoji
- 📅 Lunar date (e.g., "1/15")
- 🏮 Festival name (if applicable)
- 📆 Solar date

---

## Build Outputs

### APK Location:
```
android/app/build/outputs/apk/release/app-release.apk
```

### APK Size:
~10-15 MB (very lightweight!)

### Supported Android Versions:
- Android 5.0 (Lollipop) and higher
- Covers 99% of devices

---

## Quick Reference

| Method | Time | Requires |
|--------|------|----------|
| Docker | 10-15 min | Docker only |
| Android Studio | 5-10 min | Android Studio + Node.js |
| Manual | 5-10 min | Android SDK + Node.js + Java |

---

## Need Help?

See:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick setup guide
- `SUMMARY.md` - Project overview

Or check the source code - it's well-commented!

---

**Pro Tip:** Use the Docker build if you want the easiest path with zero setup! 🐳

**Pro Tip 2:** After the first build, subsequent builds are much faster (2-3 minutes).
