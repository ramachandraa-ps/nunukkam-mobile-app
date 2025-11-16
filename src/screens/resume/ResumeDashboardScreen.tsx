import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const ResumeDashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  const resumes = data.getAllResumes();

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Resumes</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {resumes.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
              <Text style={styles.emptyIcon}>📄</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Resumes Yet</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Create your first resume to get started
              </Text>
            </View>
          ) : (
            resumes.map((resume: any) => (
              <View key={resume.id} style={[styles.resumeCard, { backgroundColor: colors.card }]}>
                <View style={[styles.resumeThumbnail, { backgroundColor: colors.border }]}>
                  <Text style={styles.thumbnailIcon}>📄</Text>
                </View>
                <View style={styles.resumeInfo}>
                  <Text style={[styles.resumeTitle, { color: colors.text }]}>{resume.title}</Text>
                  <Text style={[styles.resumeDate, { color: colors.textSecondary }]}>
                    Last edited: {new Date(resume.lastEdited).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.resumeActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.primary }]}
                    onPress={() => (navigation as any).navigate('ResumeBuilder', { resumeId: resume.id })}
                  >
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.background }]}>
                    <Text style={styles.iconButtonText}>⋮</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('ResumeBuilder' as never)}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
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
  emptyText: { fontSize: 16, textAlign: 'center' },
  resumeCard: {
    flexDirection: 'row',
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
  resumeThumbnail: {
    width: 60,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  thumbnailIcon: { fontSize: 32 },
  resumeInfo: { flex: 1, justifyContent: 'center' },
  resumeTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  resumeDate: { fontSize: 14 },
  resumeActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: { fontSize: 20 },
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
