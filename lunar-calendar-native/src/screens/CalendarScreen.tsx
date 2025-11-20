import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import {
  solarToLunar,
  calculateMoonPhase,
  getPhaseInfo,
  getMoonEmoji,
  formatLunarDate,
  isSpecialLunarDay,
} from '../utils/lunarCalendar';
import {
  vietnameseHolidays,
  altarOfferings,
} from '../data/vietnameseHolidays';
import MoonPhaseView from '../components/MoonPhaseView';

const { width } = Dimensions.get('window');
const daySize = (width - 60) / 7;

const CalendarScreen: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    setCalendarMonth(currentDate);
  }, [currentDate]);

  const changeMonth = (direction: number) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(calendarMonth.getMonth() + direction);
    setCalendarMonth(newDate);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCalendarMonth(today);
  };

  const handleDayPress = (date: Date) => {
    setSelectedDate(new Date(date));
    const lunarDate = solarToLunar(date);
    const holidayKey = `${lunarDate.month}/${lunarDate.day}`;
    const hasHoliday = !!vietnameseHolidays[holidayKey];
    const specialDay = isSpecialLunarDay(lunarDate.day);

    // Show modal if there's event info
    if (hasHoliday || (specialDay.isSpecial && specialDay.type)) {
      setShowInfoModal(true);
    }
  };

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const today = new Date();
    const days: JSX.Element[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      const lunarDate = solarToLunar(date);
      const holidayKey = `${lunarDate.month}/${lunarDate.day}`;
      const hasHoliday = !!vietnameseHolidays[holidayKey];
      const specialDay = isSpecialLunarDay(lunarDate.day);

      let dayStyle = [styles.day];
      if (!isCurrentMonth) {
        dayStyle.push(styles.dayOtherMonth);
      }
      if (isToday) {
        dayStyle.push(styles.dayToday);
      }
      if (isSelected) {
        dayStyle.push(styles.daySelected);
      }
      if (hasHoliday) {
        dayStyle.push(styles.dayHoliday);
      } else if (specialDay.isSpecial) {
        if (specialDay.type === 'first-day') {
          dayStyle.push(styles.dayFirstDay);
        } else if (specialDay.type === 'full-moon') {
          dayStyle.push(styles.dayFullMoon);
        } else if (specialDay.type === 'month-end') {
          dayStyle.push(styles.dayMonthEnd);
        }
      }

      days.push(
        <TouchableOpacity
          key={i}
          style={dayStyle}
          onPress={() => handleDayPress(date)}>
          <Text style={styles.dayText}>{date.getDate()}</Text>
          {hasHoliday && <Text style={styles.dayIcon}>🏮</Text>}
          {!hasHoliday && specialDay.isSpecial && (
            <Text style={styles.dayIcon}>
              {specialDay.type === 'first-day'
                ? '🌑'
                : specialDay.type === 'full-moon'
                ? '🌕'
                : ''}
            </Text>
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const renderEventInfoModal = () => {
    const lunarDate = solarToLunar(selectedDate);
    const holidayKey = `${lunarDate.month}/${lunarDate.day}`;
    const holiday = vietnameseHolidays[holidayKey];

    if (holiday) {
      return (
        <ScrollView style={styles.modalContent}>
          <Text style={styles.eventTitleEn}>{holiday.nameEn}</Text>
          <Text style={styles.eventTitleVi}>{holiday.nameVi}</Text>
          <Text style={styles.eventDescription}>{holiday.descriptionEn}</Text>
          <Text style={styles.eventDescriptionVi}>{holiday.descriptionVi}</Text>
          <Text style={styles.sectionTitle}>🎭 Traditions</Text>
          <Text style={styles.sectionContent}>{holiday.traditions}</Text>
          <Text style={styles.sectionTitle}>🙏 Altar Offerings</Text>
          <Text style={styles.sectionContent}>{holiday.offerings}</Text>
        </ScrollView>
      );
    }

    const specialDay = isSpecialLunarDay(lunarDate.day);
    if (specialDay.isSpecial && specialDay.type) {
      const offering = altarOfferings[specialDay.type];
      return (
        <ScrollView style={styles.modalContent}>
          <Text style={styles.eventTitleEn}>{offering.nameEn}</Text>
          <Text style={styles.eventTitleVi}>{offering.nameVi}</Text>
          <Text style={styles.sectionTitle}>🙏 Recommended Offerings</Text>
          <Text style={styles.sectionContent}>{offering.offerings}</Text>
        </ScrollView>
      );
    }

    return null;
  };

  const lunarDate = solarToLunar(selectedDate);
  const phase = calculateMoonPhase(selectedDate);
  const phaseInfo = getPhaseInfo(phase);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌙 Lunar Calendar</Text>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.monthNav}>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => changeMonth(-1)}>
            <Text style={styles.monthButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {calendarMonth.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </Text>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => changeMonth(1)}>
            <Text style={styles.monthButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <View key={i} style={styles.weekday}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.daysGrid}>{renderCalendar()}</View>
      </View>

      <View style={styles.dateCard}>
        <Text style={styles.gregorianDate}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.lunarDate}>
          🌙 {formatLunarDate(lunarDate)}
        </Text>
      </View>

      <MoonPhaseView phase={phase} phaseInfo={phaseInfo} />

      <View style={styles.navControls}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => changeDate(-1)}>
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.todayButton]}
          onPress={goToToday}>
          <Text style={[styles.navButtonText, styles.todayButtonText]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => changeDate(1)}>
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Info Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showInfoModal}
        onRequestClose={() => setShowInfoModal(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowInfoModal(false)}>
          <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowInfoModal(false)}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            {renderEventInfoModal()}
          </Pressable>
        </Pressable>
      </Modal>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  calendarCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    margin: 15,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 36,
  },
  monthButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    flex: 1,
    textAlign: 'center',
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 3,
  },
  weekday: {
    flex: 1,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    alignItems: 'center',
  },
  weekdayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  day: {
    width: daySize,
    height: daySize,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 35,
    position: 'relative',
  },
  dayOtherMonth: {
    opacity: 0.3,
  },
  dayToday: {
    backgroundColor: 'rgba(255,215,0,0.3)',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  daySelected: {
    backgroundColor: 'rgba(100,150,255,0.3)',
    borderWidth: 2,
    borderColor: '#6496ff',
  },
  dayHoliday: {
    backgroundColor: 'rgba(255,100,100,0.4)',
    borderWidth: 2,
    borderColor: '#ff6464',
  },
  dayFirstDay: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,215,0,0.6)',
  },
  dayFullMoon: {
    backgroundColor: 'rgba(200,200,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(150,150,255,0.8)',
  },
  dayMonthEnd: {
    backgroundColor: 'rgba(150,100,200,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(150,100,200,0.6)',
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
  },
  dayIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
    fontSize: 10,
  },
  dateCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  gregorianDate: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  lunarDate: {
    fontSize: 20,
    color: '#ffd700',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,215,0,0.1)',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
  },
  navControls: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 25,
  },
  navButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  todayButton: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    borderColor: 'rgba(255,215,0,0.5)',
  },
  todayButtonText: {
    color: '#ffd700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#1a1a3e',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,100,100,0.6)',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255,100,100,0.2)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,100,100,0.4)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    maxHeight: 400,
  },
  eventTitleEn: {
    fontSize: 18,
    color: '#ff9999',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  eventTitleVi: {
    fontSize: 16,
    color: '#ffb3b3',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
    color: '#ddd',
  },
  eventDescriptionVi: {
    fontSize: 13,
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#ffd700',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 13,
    color: '#ddd',
    lineHeight: 19,
  },
});

export default CalendarScreen;
