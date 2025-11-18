# 📱 Vietnamese Lunar Calendar - Mobile App (PWA)

A Progressive Web App version of the Vietnamese Lunar Calendar that can be installed on Android smartphones with push notification support.

## ✨ Features

### 📅 Calendar Features
- **Real-time Lunar Calendar** - Accurate conversion from Gregorian to Vietnamese lunar calendar
- **19 Vietnamese Festivals** - Complete with bilingual descriptions (English & Vietnamese)
- **Moon Phase Display** - Visual representation of current moon phase
- **Altar Offering Recommendations** - Detailed guidance for ancestral worship (đồ cúng bàn thờ)
- **Special Lunar Days** - Automatic highlighting of 1st, 15th, and month-end days

### 🔔 Notification System
- **Daily Alerts at 8:00 AM** - Automatic notifications for festivals and special days
- **Bilingual Notifications** - Event names in both English and Vietnamese
- **Offering Reminders** - Includes what to prepare for the altar
- **Easy Management** - Toggle notifications on/off in settings

### 📱 Mobile Features
- **Progressive Web App** - Install on home screen like a native app
- **Offline Support** - Works without internet connection after installation
- **Mobile Optimized** - Designed specifically for smartphone screens
- **Fast & Lightweight** - No app store download required

## 🚀 Installation

### Method 1: Install as PWA (Recommended for Android)

1. **Open in Chrome or Edge browser** on your Android device
2. Visit: `https://[your-domain]/mobile-app/index.html`
3. Tap the **"Install Now"** button on the page, OR
4. Tap the menu (⋮) and select **"Add to Home Screen"** or **"Install App"**
5. The app icon will appear on your home screen

### Method 2: Direct Browser Access

Simply open `mobile-app/index.html` in any modern mobile browser.

## 🔔 Setting Up Notifications

1. **Open the app** after installation
2. Tap the **settings icon** (⚙️) in the top right
3. Enable **"Daily Event Notifications"**
4. Grant permission when prompted
5. You'll receive a test notification confirming setup

Notifications will now automatically alert you at 8:00 AM on:
- All major Vietnamese festival days
- Lunar calendar 1st (Mùng 1) - New moon
- Lunar calendar 15th (Rằm) - Full moon
- End of lunar month (29th-30th)

## 📋 Settings Options

### Notifications
- **Toggle on/off** - Enable or disable all notifications
- **Permission status** - View current notification permission state
- **Request permission** - Grant notification access if not already enabled

### Privacy
- All calculations are done locally on your device
- No data is collected or sent to external servers
- Notifications are scheduled locally, not through a backend service

## 🎯 Festivals Included

The app includes comprehensive information for 19 Vietnamese festivals:

**Major Festivals:**
- Tết Nguyên Đán (Vietnamese New Year) - Days 1-3
- Tết Nguyên Tiêu (Lantern Festival) - 1/15
- Giỗ Tổ Hùng Vương (Hung Kings Memorial) - 1/10
- Tết Hàn Thực (Cold Food Festival) - 3/3
- Lễ Phật Đản (Buddha's Birthday) - 4/15
- Tết Đoan Ngọ (Double Fifth Festival) - 5/5

**Ghost Month Events:**
- Opening of Ghost Month - 7/1
- Thất Tịch (Double Seventh) - 7/7
- Ghost Festival Eve - 7/14
- Lễ Vu Lan (Ullambana Festival) - 7/15
- Closing of Ghost Month - 7/29

**Autumn & Winter Festivals:**
- Tết Trung Thu (Mid-Autumn Festival) - 8/15
- Tết Trùng Cửu (Double Ninth) - 9/9
- Tết Hạ Nguyên (Lower Nguyen) - 10/10
- Lễ Phật Thành Đạo (Buddha's Enlightenment) - 12/8
- Tết Táo Quân (Kitchen Gods Festival) - 12/23

## 🙏 Altar Offerings Guide

Each festival and special day includes:
- Specific offerings for that occasion
- Traditional practices
- Cultural significance in both languages

**Regular Worship Days:**
- **Mùng 1** (1st): Fresh flowers, five-fruit tray, incense, rice
- **Rằm** (15th): Vegetarian food, sweet soups, sticky rice cakes
- **Month End**: Simple offerings to close the month

## 🛠️ Technical Details

**Technologies:**
- Progressive Web App (PWA)
- Service Worker for offline functionality
- Web Notifications API for push alerts
- LocalStorage for settings
- Pure JavaScript (no frameworks required)

**Browser Compatibility:**
- ✅ Chrome/Edge (Android) - Full support
- ✅ Samsung Internet - Full support
- ⚠️ Firefox (Android) - Limited PWA support
- ⚠️ Safari (iOS) - Limited notification support

**File Structure:**
```
mobile-app/
├── index.html          # Main app page
├── settings.html       # Settings page
├── app.js             # Main application logic
├── service-worker.js  # PWA & notification handler
├── manifest.json      # PWA manifest
└── README.md          # This file
```

## 📝 Usage Tips

1. **Navigate dates** using the Previous/Today/Next buttons at the bottom
2. **Check moon phase** displayed prominently on each day
3. **Read full descriptions** by scrolling through the event card
4. **Access settings** via the gear icon (⚙️) in the top right
5. **Install to home screen** for faster access and better experience

## 🔧 Troubleshooting

**Notifications not working?**
- Check that notifications are enabled in settings
- Verify browser notification permissions
- Make sure the app is installed as PWA (not just bookmarked)
- Check your device's Do Not Disturb settings

**App not installing?**
- Use Chrome or Edge browser
- Clear browser cache and try again
- Make sure you have enough storage space

**Dates seem incorrect?**
- The app uses Vietnamese Tết dates for 2020-2030
- Lunar calculations are approximations
- For precise dates, consult traditional lunar calendars

## 📞 Support

For issues or suggestions related to this mobile app version, please refer to the main repository.

---

**Note:** This is a Progressive Web App (PWA) designed primarily for Android devices. iOS support is limited due to Apple's restrictions on PWA functionality and notifications.
