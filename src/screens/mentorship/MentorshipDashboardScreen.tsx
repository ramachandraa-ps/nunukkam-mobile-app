import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';
import { MentorshipSession } from '../../types';

export const MentorshipDashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();

  const mentorships = data.getAllMentorshipSessions();
  const upcomingSessions = mentorships.filter((m: any) => m.status === 'upcoming');
  const pastSessions = mentorships.filter((m: any) => m.status === 'completed');

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Mentorship</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {upcomingSessions.length === 0 && pastSessions.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
              <Text style={styles.emptyIcon}>👨‍🏫</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Sessions Yet</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Book your first mentorship session to get personalized guidance
              </Text>
              <TouchableOpacity
                style={[styles.bookButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('BookSession' as never)}
              >
                <Text style={styles.bookButtonText}>Book Your First Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {upcomingSessions.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Sessions</Text>
                  {upcomingSessions.map((session: MentorshipSession) => (
                    <View key={session.id} style={[styles.sessionCard, { backgroundColor: colors.card }]}>
                      <View style={styles.sessionHeader}>
                        <View style={[styles.mentorAvatar, { backgroundColor: colors.primary + '20' }]}>
                          <Text style={styles.avatarText}>
                            {session.mentor.name.charAt(0)}
                          </Text>
                        </View>
                        <View style={styles.sessionInfo}>
                          <Text style={[styles.mentorName, { color: colors.text }]}>
                            {session.mentor.name}
                          </Text>
                          <Text style={[styles.mentorTitle, { color: colors.textSecondary }]}>
                            {session.mentor.title}
                          </Text>
                          <Text style={[styles.sessionDate, { color: colors.textSecondary }]}>
                            {new Date(session.date).toLocaleDateString()} • {session.time}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.sessionActions}>
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: colors.primary }]}
                        >
                          <Text style={styles.actionButtonText}>Join Session</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: colors.danger }]}
                          onPress={() => (navigation as any).navigate('CancelSession', { sessionId: session.id })}
                        >
                          <Text style={styles.actionButtonText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {pastSessions.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Past Sessions</Text>
                  {pastSessions.map((session: MentorshipSession) => (
                    <TouchableOpacity
                      key={session.id}
                      style={[styles.sessionCard, { backgroundColor: colors.card }]}
                      onPress={() => (navigation as any).navigate('SessionNotes', { sessionId: session.id })}
                    >
                      <View style={styles.sessionHeader}>
                        <View style={[styles.mentorAvatar, { backgroundColor: colors.border }]}>
                          <Text style={styles.avatarText}>
                            {session.mentor.name.charAt(0)}
                          </Text>
                        </View>
                        <View style={styles.sessionInfo}>
                          <Text style={[styles.mentorName, { color: colors.text }]}>
                            {session.mentor.name}
                          </Text>
                          <Text style={[styles.sessionDate, { color: colors.textSecondary }]}>
                            {new Date(session.date).toLocaleDateString()} • {session.time}
                          </Text>
                        </View>
                        <Text style={[styles.viewNotes, { color: colors.primary }]}>View Notes →</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {(upcomingSessions.length > 0 || pastSessions.length > 0) && (
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('BookSession' as never)}
          >
            <Text style={styles.fabIcon}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  scrollView: { flex: 1 },
  emptyState: {
    margin: 16,
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  emptyText: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  sessionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  sessionInfo: { flex: 1 },
  mentorName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  mentorTitle: { fontSize: 14, marginBottom: 4 },
  sessionDate: { fontSize: 14 },
  viewNotes: { fontSize: 14, fontWeight: '600' },
  sessionActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: { color: '#FFFFFF', fontSize: 32, fontWeight: '300' },
  bottomSpacer: { height: 100 },
});
