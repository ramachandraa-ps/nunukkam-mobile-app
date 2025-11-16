import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';
import { Mentor } from '../../types';

export const BookSessionScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  const mentors = data.getAllMentors();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const availableSlots = ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleBook = () => {
    setBooked(true);
  };

  if (booked) {
    return (
      <SafeAreaWrapper>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.successCard, { backgroundColor: colors.card }]}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={[styles.successTitle, { color: colors.text }]}>Session Booked!</Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your mentorship session has been booked with {mentors[0]?.name} for {selectedDate} at {selectedSlot}.
            </Text>
            <Button
              title="Back to Dashboard"
              onPress={() => navigation.goBack()}
              fullWidth
            />
          </View>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Book a Session</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Mentor</Text>
            {mentors.map((mentor: Mentor) => (
              <TouchableOpacity
                key={mentor.id}
                style={[
                  styles.mentorOption,
                  {
                    backgroundColor: selectedMentor === mentor.id ? colors.primary + '20' : colors.background,
                    borderColor: selectedMentor === mentor.id ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedMentor(mentor.id)}
              >
                <View style={[styles.mentorAvatar, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={styles.avatarText}>{mentor.name.charAt(0)}</Text>
                </View>
                <View style={styles.mentorInfo}>
                  <Text style={[styles.mentorName, { color: colors.text }]}>{mentor.name}</Text>
                  <Text style={[styles.mentorTitle, { color: colors.textSecondary }]}>{mentor.title}</Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: selectedMentor === mentor.id ? colors.primary : colors.border,
                      backgroundColor: selectedMentor === mentor.id ? colors.primary : 'transparent',
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {selectedMentor && (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Date</Text>
              <View style={styles.dateGrid}>
                {['Mon, Dec 18', 'Tue, Dec 19', 'Wed, Dec 20', 'Thu, Dec 21'].map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.dateButton,
                      {
                        backgroundColor: selectedDate === date ? colors.primary : colors.background,
                        borderColor: selectedDate === date ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[styles.dateText, { color: selectedDate === date ? '#FFFFFF' : colors.text }]}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {selectedDate && (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Time Slot</Text>
              <View style={styles.slotGrid}>
                {availableSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.slotButton,
                      {
                        backgroundColor: selectedSlot === slot ? colors.primary : colors.background,
                        borderColor: selectedSlot === slot ? colors.primary : colors.border,
                      },
                    ]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={[styles.slotText, { color: selectedSlot === slot ? '#FFFFFF' : colors.text }]}>
                      {slot}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {selectedMentor && selectedDate && selectedSlot && (
          <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
            <Button
              title="Confirm Booking"
              onPress={handleBook}
              fullWidth
            />
          </View>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  mentorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
  },
  mentorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 20, fontWeight: '700' },
  mentorInfo: { flex: 1 },
  mentorName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  mentorTitle: { fontSize: 14 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  dateText: { fontSize: 14, fontWeight: '600' },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  slotText: { fontSize: 14, fontWeight: '600' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  successCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  successIcon: { fontSize: 64, marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  successMessage: { fontSize: 16, textAlign: 'center', marginBottom: 32 },
  bottomSpacer: { height: 80 },
});
