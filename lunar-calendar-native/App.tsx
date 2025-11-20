import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import CalendarScreen from './src/screens/CalendarScreen';
import { configureNotifications, scheduleDailyNotification } from './src/utils/notifications';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#0f0f23',
    flex: 1,
  };

  useEffect(() => {
    // Initialize notifications on app start
    try {
      configureNotifications();
      scheduleDailyNotification();
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }, []);

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
