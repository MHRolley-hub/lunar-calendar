import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { solarToLunar, getMoonEmoji } from './lunarCalendar';
import { vietnameseHolidays } from '../data/vietnameseHolidays';

// Configure push notifications
export const configureNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  // Create notification channel for Android
  PushNotification.createChannel(
    {
      channelId: 'lunar-calendar-daily',
      channelName: 'Daily Lunar Calendar',
      channelDescription: 'Daily notifications for lunar calendar events',
      playSound: true,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`Channel created: ${created}`)
  );
};

// Schedule daily notification at 8 AM
export const scheduleDailyNotification = () => {
  // Cancel all previous notifications
  PushNotification.cancelAllLocalNotifications();

  const today = new Date();
  const lunarDate = solarToLunar(today);
  const holidayKey = `${lunarDate.month}/${lunarDate.day}`;
  const holiday = vietnameseHolidays[holidayKey];

  if (holiday) {
    // Schedule notification for festival day
    const scheduledDate = new Date();
    scheduledDate.setHours(8, 0, 0, 0);

    // If 8 AM has passed today, schedule for tomorrow
    if (scheduledDate <= today) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'lunar-calendar-daily',
      title: `🏮 ${holiday.nameEn}`,
      message: `${holiday.nameVi}\n\n${holiday.descriptionEn.substring(0, 100)}...`,
      date: scheduledDate,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  } else if (lunarDate.day === 1 || lunarDate.day === 15) {
    // Special lunar days
    const dayName = lunarDate.day === 1 ? 'First Day of Month' : 'Full Moon Day';
    const moonEmoji = lunarDate.day === 1 ? '🌑' : '🌕';

    const scheduledDate = new Date();
    scheduledDate.setHours(8, 0, 0, 0);

    if (scheduledDate <= today) {
      scheduledDate.setDate(scheduledDate.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'lunar-calendar-daily',
      title: `${moonEmoji} ${dayName}`,
      message: `Today is ${lunarDate.month}/${lunarDate.day} in the lunar calendar`,
      date: scheduledDate,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  }
};

// Send immediate test notification
export const sendTestNotification = () => {
  const today = new Date();
  const lunarDate = solarToLunar(today);

  PushNotification.localNotification({
    channelId: 'lunar-calendar-daily',
    title: '🌙 Lunar Calendar Test',
    message: `Today is ${lunarDate.month}/${lunarDate.day} in the lunar calendar`,
  });
};
