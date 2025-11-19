import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MoonPhaseInfo, getMoonEmoji } from '../utils/lunarCalendar';

interface MoonPhaseViewProps {
  phase: number;
  phaseInfo: MoonPhaseInfo;
}

const MoonPhaseView: React.FC<MoonPhaseViewProps> = ({ phase, phaseInfo }) => {
  // Calculate rotation for moon visualization
  const rotation = phase * 360;

  return (
    <View style={styles.container}>
      <View style={styles.moonPhase}>
        <Text style={styles.moonEmoji}>{getMoonEmoji(phase)}</Text>
      </View>
      <Text style={styles.phaseName}>{phaseInfo.name}</Text>
      <Text style={styles.illumination}>{phaseInfo.illumination}% Illuminated</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  moonPhase: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  moonEmoji: {
    fontSize: 80,
  },
  phaseName: {
    fontSize: 20,
    color: '#f0f0f0',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  illumination: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default MoonPhaseView;
