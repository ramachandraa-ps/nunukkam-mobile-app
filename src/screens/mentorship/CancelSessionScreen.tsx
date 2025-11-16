import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button, Input } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const CancelSessionScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState('');
  const [cancelled, setCancelled] = useState(false);

  const reasons = [
    'Schedule conflict',
    'Not feeling well / Illness',
    'Personal emergency',
    'Need to reschedule for a different time',
    'Technical issues (internet/device)',
    'Other',
  ];

  const handleCancel = () => {
    setCancelled(true);
  };

  if (cancelled) {
    return (
      <SafeAreaWrapper>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={[styles.successCard, { backgroundColor: colors.card }]}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={[styles.successTitle, { color: colors.text }]}>Session Cancelled</Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your mentorship session with Ms. Trainer's Name, scheduled for October 4, 2025, at 5:00 PM, has been cancelled.
            </Text>
            <Button
              title="Book a Session"
              onPress={() => navigation.navigate('BookSession' as never)}
              fullWidth
            />
            <Button
              title="Go Back to Dashboard"
              onPress={() => navigation.navigate('MentorshipDashboard' as never)}
              variant="outline"
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Cancel Session</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.warningText, { color: colors.danger }]}>
              ⚠️ You must cancel at least 1 hour before the scheduled time.
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Reason for Cancellation</Text>
            {reasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={[
                  styles.reasonOption,
                  {
                    backgroundColor: selectedReason === reason ? colors.primary + '20' : colors.background,
                    borderColor: selectedReason === reason ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedReason(reason)}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: selectedReason === reason ? colors.primary : colors.border,
                      backgroundColor: selectedReason === reason ? colors.primary : 'transparent',
                    },
                  ]}
                />
                <Text style={[styles.reasonText, { color: colors.text }]}>{reason}</Text>
              </TouchableOpacity>
            ))}

            {selectedReason === 'Other' && (
              <Input
                value={otherReason}
                onChangeText={setOtherReason}
                placeholder="Please specify your reason..."
                multiline
                numberOfLines={4}
              />
            )}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <Button
            title="Cancel Session"
            onPress={handleCancel}
            disabled={!selectedReason || (selectedReason === 'Other' && !otherReason)}
            fullWidth
          />
        </View>
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
  warningText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
  },
  reasonText: { flex: 1, fontSize: 16 },
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
