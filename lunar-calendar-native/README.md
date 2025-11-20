# Vietnamese Lunar Calendar - React Native Android App

A beautiful native Android app featuring a Vietnamese Lunar Calendar with **home screen widgets** and **push notifications**.

## Features

✅ **Full Lunar Calendar** - Complete calendar grid with moon phases and Vietnamese festivals
✅ **1x1 Home Screen Widget** - Shows lunar date + moon phase emoji
✅ **2x1 Home Screen Widget** - Shows lunar date, moon phase, and upcoming festival
✅ **Push Notifications** - Daily reminders at 8 AM for festivals and special lunar days
✅ **19 Vietnamese Festivals** - Full descriptions, traditions, and altar offerings
✅ **Moon Phase Calculations** - Real-time astronomical moon phase display
✅ **Offline Support** - Works completely offline once installed
✅ **Beautiful Dark Theme** - Gradient background matching the web version

## Prerequisites

Before building, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **JDK 17** - [Download](https://adoptium.net/)
- **Android Studio** - [Download](https://developer.android.com/studio)
- **Android SDK** (API 34)
- **React Native CLI** - Install with `npm install -g react-native-cli`

## Installation

### 1. Install Dependencies

```bash
cd lunar-calendar-native
npm install
```

### 2. Set up Android Environment

Make sure your `ANDROID_HOME` environment variable is set:

**Linux/macOS:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows (PowerShell):**
```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
```

### 3. Build and Run

#### Option A: Run on Physical Device

1. Enable **Developer Options** and **USB Debugging** on your Android phone
2. Connect phone via USB
3. Run:
```bash
npm run android
```

#### Option B: Run on Emulator

1. Open Android Studio → AVD Manager
2. Create a new virtual device (Pixel 5 recommended)
3. Start the emulator
4. Run:
```bash
npm run android
```

### 4. Build Release APK

To create an installable APK:

```bash
cd android
./gradlew assembleRelease
```

The APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Adding Widgets to Home Screen

After installing the app:

1. **Long-press** on your Android home screen
2. Tap **Widgets**
3. Find **Vietnamese Lunar Calendar**
4. Choose either:
   - **1x1 Widget** - Compact lunar date + moon
   - **2x1 Widget** - Lunar date + festival info
5. **Drag** to your home screen

Widgets update every hour and show:
- Current lunar date (e.g., "1/15")
- Moon phase emoji (🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘)
- Festival name (if today is a special day)
- Solar date

## Push Notifications

The app sends daily notifications at **8:00 AM** for:
- Vietnamese festivals (all 19 festivals)
- First day of lunar month (Mùng 1)
- Full moon day (Rằm - 15th)

To test notifications:
1. Open app
2. Grant notification permission when prompted
3. Notifications will appear daily at 8 AM

## Project Structure

```
lunar-calendar-native/
├── android/                    # Native Android code
│   └── app/src/main/
│       ├── java/com/lunarcalendarapp/
│       │   ├── widgets/        # Widget providers (1x1 and 2x1)
│       │   │   ├── SmallWidgetProvider.java
│       │   │   ├── LargeWidgetProvider.java
│       │   │   └── LunarCalendarUtils.java
│       │   └── receivers/      # Boot receiver for notifications
│       └── res/
│           ├── layout/         # Widget layouts
│           ├── xml/            # Widget configurations
│           └── values/         # Strings and styles
├── src/
│   ├── components/             # React components
│   │   └── MoonPhaseView.tsx
│   ├── data/                   # Vietnamese festivals data
│   │   └── vietnameseHolidays.ts
│   ├── screens/                # App screens
│   │   └── CalendarScreen.tsx
│   └── utils/                  # Utilities
│       ├── lunarCalendar.ts    # Moon phase & lunar conversion
│       └── notifications.ts     # Notification scheduling
├── App.tsx                     # Main app component
└── index.js                    # Entry point
```

## Customization

### Change Notification Time

Edit `src/utils/notifications.ts`:

```typescript
// Change from 8 AM to 7 AM
scheduledDate.setHours(7, 0, 0, 0);
```

### Change Widget Update Frequency

Edit `android/app/src/main/res/xml/small_widget_info.xml`:

```xml
<!-- Change from 1 hour to 30 minutes (milliseconds) -->
android:updatePeriodMillis="1800000"
```

### Add More Festivals

Edit `src/data/vietnameseHolidays.ts`:

```typescript
export const vietnameseHolidays: Record<string, Holiday> = {
  // Add new festival
  '2/19': {
    nameEn: 'New Festival',
    nameVi: 'Lễ Mới',
    // ...
  }
};
```

## Troubleshooting

### Build Errors

**"SDK location not found"**
```bash
# Create local.properties file in android/ directory
echo "sdk.dir=/path/to/Android/Sdk" > android/local.properties
```

**"Gradle daemon stopped"**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**"Unable to load script from assets"**
```bash
# Start Metro bundler manually
npm start
# In another terminal:
npm run android
```

### Widget Not Updating

Widgets update every hour by default. To force update:
1. Remove widget from home screen
2. Add it again

### Notifications Not Working

1. Check Settings → Apps → Vietnamese Lunar Calendar → Notifications
2. Ensure "Allow notifications" is enabled
3. Ensure battery optimization is disabled for the app

## Development

### Run in Development Mode

```bash
# Terminal 1: Start Metro bundler
npm start

# Terminal 2: Run on device/emulator
npm run android
```

### View Logs

```bash
# View app logs
npx react-native log-android

# View widget logs
adb logcat | grep WidgetProvider
```

### Hot Reload

Press **R** twice on your device/emulator or use:
- **Shake device** → Enable Hot Reloading
- **Ctrl+M** (emulator) → Enable Hot Reloading

## Technical Details

### Lunar Calendar Algorithm

- Uses Vietnamese Tết (Lunar New Year) reference dates (2020-2035)
- Approximates lunar months with alternating 29-30 day cycles
- Accuracy: ±1 day (sufficient for cultural purposes)

### Moon Phase Calculation

- Based on astronomical new moon: January 6, 2000, 18:14 UTC
- Lunar cycle: 29.530588853 days
- Formula: `(days_since_new_moon % cycle) / cycle`

### Widget Architecture

- **AppWidgetProvider** pattern for Android widgets
- Updates triggered every hour + manual refresh
- Uses **RemoteViews** to render layouts
- Stores no local state (calculates on each update)

### Notification System

- Uses **react-native-push-notification** library
- Scheduled with **AlarmManager** (exact alarms)
- Persists across device reboots via **BootReceiver**
- Displays in system notification tray

## License

Free to use and modify for personal and commercial projects.

## Credits

Based on the Vietnamese Lunar Calendar web app with complete festival data, moon phase calculations, and altar offering recommendations.

---

## Quick Start Summary

```bash
# Install dependencies
npm install

# Run on connected Android device
npm run android

# Build APK
cd android && ./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

Install APK on phone → Add widgets to home screen → Enjoy! 🌙
