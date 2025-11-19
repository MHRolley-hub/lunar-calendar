# Build Without Admin Rights - Vietnamese Lunar Calendar

Perfect solution if you **don't have admin/sudo permissions**! Everything installs to your user directory.

---

## Option 1: Portable Build Script (Recommended)

This script downloads everything to `~/lunar-calendar-build` (no admin needed!)

### Linux/Mac:

```bash
cd lunar-calendar-native
chmod +x build-portable.sh
./build-portable.sh
```

### Windows:

```powershell
cd lunar-calendar-native
.\build-portable.bat
```

**First run**: 10-15 minutes (downloads Android SDK)
**Subsequent runs**: 2-3 minutes

**What it does:**
1. Downloads Android Command Line Tools to `~/lunar-calendar-build/android-sdk`
2. Installs required SDK packages (no admin!)
3. Builds your APK

**Result:** `android/app/build/outputs/apk/release/app-release.apk`

---

## Option 2: Online Build Services (Zero Setup!)

Upload your code to a cloud build service. **No local tools needed at all!**

### A) GitHub Actions (Free)

1. **Push your code to GitHub** (if not already there)

2. **Create `.github/workflows/build.yml`**:
   ```yaml
   name: Build Android APK

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
       - uses: actions/checkout@v3

       - name: Set up JDK 17
         uses: actions/setup-java@v3
         with:
           java-version: '17'
           distribution: 'temurin'

       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '22'

       - name: Install dependencies
         run: |
           cd lunar-calendar-native
           npm install

       - name: Bundle JavaScript
         run: |
           cd lunar-calendar-native
           mkdir -p android/app/src/main/assets
           npx react-native bundle \
             --platform android \
             --dev false \
             --entry-file index.js \
             --bundle-output android/app/src/main/assets/index.android.bundle \
             --assets-dest android/app/src/main/res/

       - name: Build APK
         run: |
           cd lunar-calendar-native/android
           chmod +x gradlew
           ./gradlew assembleRelease

       - name: Upload APK
         uses: actions/upload-artifact@v3
         with:
           name: app-release
           path: lunar-calendar-native/android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Push to GitHub**
4. **Go to Actions tab → Download APK**

### B) Expo EAS Build (React Native)

```bash
npm install -g eas-cli
eas build --platform android
```

Downloads APK when done!

### C) AppCenter (Microsoft)

1. Sign up: https://appcenter.ms
2. Connect your GitHub repo
3. Configure Android build
4. Download APK from dashboard

---

## Option 3: Use Replit/CodeSandbox

### Replit:

1. Go to https://replit.com
2. Import your GitHub repo
3. Run build commands in Shell
4. Download APK via Files panel

### CodeSandbox:

1. Go to https://codesandbox.io
2. Import from GitHub
3. Use terminal to build
4. Download via file browser

---

## Option 4: Docker (If Available Without Admin)

Some systems allow Docker without admin:

```bash
cd lunar-calendar-native
docker build -t lunar-app .
docker run --rm -v "$(pwd)/output:/output" lunar-app
```

APK appears in `output/` folder!

---

## Comparison

| Method | Setup Time | Build Time | Internet Required |
|--------|-----------|------------|-------------------|
| Portable Script | 15 min first time | 2-3 min | Yes (first time) |
| GitHub Actions | 5 min | 10 min | Yes |
| Expo EAS | 2 min | 15 min | Yes |
| AppCenter | 10 min | 10 min | Yes |
| Replit/CodeSandbox | 0 min | 10 min | Yes |

---

## My Recommendation

**If you have internet:** Use the **Portable Build Script**
- Fast after first run
- Full control
- Works offline after setup

**If no local build works:** Use **GitHub Actions**
- Zero local setup
- Builds in cloud
- Free for public repos

---

## Troubleshooting Portable Build

### "curl: command not found" (Linux)

Try `wget` instead:
```bash
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdlinetools.zip
```

### "PowerShell is not recognized" (Windows)

You're on an old Windows. Use Windows 10+ or use GitHub Actions instead.

### "Permission denied"

The script needs execute permission:
```bash
chmod +x build-portable.sh
```

### "Disk space" error

The Android SDK needs ~3GB. Check:
```bash
df -h ~
```

If low, use GitHub Actions instead (builds in cloud).

---

## After Building

### Transfer APK to Phone:

**Via USB:**
```bash
# Connect phone, enable File Transfer
cp android/app/build/outputs/apk/release/app-release.apk ~/Desktop/
# Drag from Desktop to phone
```

**Via Email:**
- Email the APK to yourself
- Open on phone
- Install

**Via Cloud:**
- Upload to Google Drive/Dropbox
- Download on phone
- Install

### Install:

1. **Enable "Unknown Sources"** in phone settings
2. **Tap the APK** to install
3. **Add widgets** to home screen!

---

## Questions?

**Q: Is this safe without admin?**
A: Yes! Everything installs to your user directory only.

**Q: Can I delete ~/lunar-calendar-build after?**
A: Yes, after building. But keep it for faster future builds!

**Q: Which is fastest?**
A: Portable script (after first setup). GitHub Actions if you don't want to install anything.

**Q: Internet required?**
A: Only for initial SDK download. After that, builds work offline.

---

## Quick Start Summary

**Linux/Mac:**
```bash
./build-portable.sh
```

**Windows:**
```cmd
build-portable.bat
```

**No local build:**
- Use GitHub Actions (see Option 2A above)

**Result:**
- APK at: `android/app/build/outputs/apk/release/app-release.apk`
- Size: ~10-15 MB
- Ready to install on any Android 5.0+ phone!

---

Need help? Check `README.md` or `BUILD_INSTRUCTIONS.md`!
