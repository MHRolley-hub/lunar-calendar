# Quick Start Guide - Vietnamese Lunar Calendar Android App

## 🚀 Fast Track to Running the App

### Prerequisites Installation (15 minutes)

1. **Install Node.js**: https://nodejs.org/ (Download LTS version)
2. **Install Java JDK 17**: https://adoptium.net/
3. **Install Android Studio**: https://developer.android.com/studio

### First Time Setup (10 minutes)

```bash
# 1. Navigate to project
cd lunar-calendar-native

# 2. Install dependencies
npm install

# 3. Set Android SDK path (if needed)
# Linux/macOS:
export ANDROID_HOME=$HOME/Android/Sdk

# Windows:
# Set via System Environment Variables or use:
# setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
```

### Run on Phone (5 minutes)

```bash
# 1. Enable Developer Mode on your Android phone:
#    Settings → About Phone → Tap "Build Number" 7 times

# 2. Enable USB Debugging:
#    Settings → Developer Options → USB Debugging (ON)

# 3. Connect phone to computer via USB

# 4. Run the app:
npm run android

# ✅ App should install and launch automatically!
```

### Build APK to Share (3 minutes)

```bash
cd android
./gradlew assembleRelease
```

Find APK at: `android/app/build/outputs/apk/release/app-release.apk`

Transfer to any Android phone and install!

---

## 🎯 Adding Widgets (30 seconds)

After installing the app:

1. **Long-press** your home screen
2. Tap **Widgets**
3. Find **Vietnamese Lunar Calendar**
4. **Drag** to home screen
5. Choose **1x1** (small) or **2x1** (large) size

Done! Widget shows:
- 🌙 Moon phase emoji
- 📅 Lunar date (e.g., "1/15")
- 🏮 Festival name (if today is special)

---

## 🔔 Notifications

Automatically enabled! You'll get notifications at **8:00 AM** for:
- Vietnamese festivals
- Full moon days (Rằm)
- First day of month (Mùng 1)

---

## ❓ Troubleshooting

### "SDK location not found"
Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```
(Adjust path for your OS)

### "Unable to load script"
```bash
# Terminal 1:
npm start

# Terminal 2:
npm run android
```

### "Device not detected"
- Check USB cable
- Accept "Allow USB debugging" popup on phone
- Try: `adb devices` (should show your device)

---

## 📱 Features Overview

**Main App:**
- Full calendar grid with Vietnamese festivals
- Moon phase visualization
- 19 festival descriptions + altar offerings
- Bilingual (English/Vietnamese)

**Widgets:**
- **1x1**: Compact lunar date + moon emoji
- **2x1**: Lunar date + festival info + solar date

**Notifications:**
- Daily at 8 AM for special days
- Includes festival details
- Persists after phone restart

---

## 🛠 Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android device
npm run android

# View logs
npx react-native log-android

# Clean build
cd android && ./gradlew clean && cd ..

# Build release APK
cd android && ./gradlew assembleRelease
```

---

## 📝 Notes

- **Widgets update every hour** (configurable in XML)
- **Notifications scheduled locally** (no internet required after install)
- **All data included** (works 100% offline)
- **Lunar dates accurate** for 2020-2035

---

## 🎉 That's It!

You now have a fully functional native Android app with widgets and notifications!

**Next Steps:**
- Share APK with friends/family
- Customize notification time
- Add more festivals
- Change widget appearance

See README.md for advanced customization options.

---

**Need help?** Check the main README.md or review the source code comments.
