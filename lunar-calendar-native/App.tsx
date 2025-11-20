import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CalendarScreen from './src/screens/CalendarScreen';
// Temporarily disabled notifications to isolate crash
// import { configureNotifications, scheduleDailyNotification } from './src/utils/notifications';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#0f0f23',
    flex: 1,
  };

  // Temporarily disabled notification initialization to isolate crash
  // useEffect(() => {
  //   // Delay notification initialization to prevent startup crashes
  //   // Notifications will be set up after the app is fully loaded
  //   const timer = setTimeout(() => {
  //     try {
  //       configureNotifications();
  //       scheduleDailyNotification();
  //     } catch (error) {
  //       console.error('Failed to initialize notifications:', error);
  //       // Continue running even if notifications fail
  //     }
  //   }, 2000); // Wait 2 seconds after app loads

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <CalendarScreen />
    </SafeAreaView>
  );
}

export default App;
