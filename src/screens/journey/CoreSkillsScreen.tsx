import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const CoreSkillsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();

  const courses = data.getAllCourses();
  // Mock core skills - in real app this would come from course data
  const coreSkills = courses.map((course: any) => ({
    id: course.id,
    name: course.name,
    description: course.description,
    duration: course.duration,
    locked: false,
    progress: { completed: 0, total: course.modules?.length || 0 },
    modules: course.modules || [],
  }));

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Core Skills</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.grid}>
            {coreSkills.map((skill: any, index: number) => (
              <TouchableOpacity
                key={skill.id}
                style={[
                  styles.skillCard,
                  { backgroundColor: colors.card, opacity: skill.locked ? 0.6 : 1 },
                ]}
                onPress={() => !skill.locked && (navigation as any).navigate('ModuleDetail', { skillId: skill.id })}
                disabled={skill.locked}
              >
                {skill.locked && (
                  <View style={styles.lockBadge}>
                    <Text style={styles.lockIcon}>🔒</Text>
                  </View>
                )}
                <View style={[styles.skillIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={styles.skillEmoji}>📚</Text>
                </View>
                <Text style={[styles.skillName, { color: colors.text }]}>{skill.name}</Text>
                <Text style={[styles.skillDuration, { color: colors.textSecondary }]}>
                  {skill.duration} hours
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.success,
                        width: `${(skill.progress.completed / skill.progress.total) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  {skill.progress.completed}/{skill.progress.total} modules
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  headerTitle: { fontSize: 18, fontWeight: '700' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  skillCard: {
    width: '47%',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  lockIcon: { fontSize: 20 },
  skillIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  skillEmoji: { fontSize: 24 },
  skillName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  skillDuration: { fontSize: 14, marginBottom: 12 },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 12 },
  bottomSpacer: { height: 80 },
});
