# GitHub Actions Workflows

## Build Android APK

This workflow automatically builds the Android APK in the cloud.

### When it runs:
- ✅ Every push to `main` branch
- ✅ Every push to the current development branch
- ✅ Manually (using "Run workflow" button)

### What it does:
1. Sets up Java JDK 17
2. Sets up Node.js 22
3. Installs npm dependencies
4. Bundles React Native JavaScript
5. Builds Android APK
6. Uploads APK as downloadable artifact

### How to download the APK:

1. Go to: https://github.com/MHRolley-hub/lunar-calendar/actions
2. Click the latest "Build Android APK" workflow run
3. Scroll down to "Artifacts" section
4. Click "Vietnamese-Lunar-Calendar-APK" to download

### Build time:
~8-10 minutes

### APK details:
- **Size**: ~10-15 MB
- **Name**: `app-release.apk`
- **Supports**: Android 5.0+ (API 21+)

### Manual trigger:

To build manually:
1. Go to Actions tab
2. Click "Build Android APK"
3. Click "Run workflow"
4. Select branch
5. Click green "Run workflow" button

The APK will be available in ~10 minutes!
