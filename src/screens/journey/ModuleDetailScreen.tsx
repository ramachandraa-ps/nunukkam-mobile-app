import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const ModuleDetailScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const data = useData();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const skillId = (route.params as any)?.skillId;
  const courses = data.getAllCourses();
  const course = courses.find((c: any) => c.id === skillId);
  const modules = course?.modules || [];

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{course?.name || 'Module Details'}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>Module Progress</Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${modules.length > 0 ? (modules.filter((m: any) => m.progress === 100).length / modules.length) * 100 : 0}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>
              {modules.filter((m: any) => m.progress === 100).length}/{modules.length} modules completed
            </Text>
          </View>

          {modules.map((module: any) => (
            <View key={module.id} style={[styles.moduleCard, { backgroundColor: colors.card }]}>
              <TouchableOpacity
                style={styles.moduleHeader}
                onPress={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              >
                <View style={styles.moduleInfo}>
                  <Text style={[styles.moduleName, { color: colors.text }]}>{module.name}</Text>
                  <Text style={[styles.moduleStats, { color: colors.textSecondary }]}>
                    {module.chapters.length} chapters • {module.assessments.length} assessments
                  </Text>
                </View>
                <Text style={styles.expandIcon}>{expandedModule === module.id ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {expandedModule === module.id && (
                <View style={styles.chapterList}>
                  {module.chapters.map((chapter: any, index: number) => (
                    <View key={chapter.id}>
                      <TouchableOpacity
                        style={[styles.chapterItem, { opacity: chapter.locked ? 0.5 : 1 }]}
                        disabled={chapter.locked}
                      >
                        <View style={styles.chapterIcon}>
                          {chapter.locked ? (
                            <Text style={styles.lockIcon}>🔒</Text>
                          ) : chapter.completed ? (
                            <Text style={styles.checkIcon}>✅</Text>
                          ) : (
                            <Text style={[styles.chapterNumber, { color: colors.primary }]}>
                              {index + 1}
                            </Text>
                          )}
                        </View>
                        <View style={styles.chapterInfo}>
                          <Text style={[styles.chapterName, { color: colors.text }]}>
                            {chapter.name}
                          </Text>
                          <Text style={[styles.chapterType, { color: colors.textSecondary }]}>
                            {chapter.type}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[
                            styles.chapterButton,
                            { backgroundColor: chapter.locked ? colors.border : colors.primary },
                          ]}
                          disabled={chapter.locked}
                        >
                          <Text style={[styles.chapterButtonText, { color: chapter.locked ? colors.textSecondary : '#FFFFFF' }]}>
                            {chapter.completed ? 'Review' : 'View'}
                          </Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
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
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  progressCard: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressLabel: { fontSize: 14, marginBottom: 8 },
  progressBar: { height: 8, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 14, fontWeight: '600' },
  moduleCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  moduleInfo: { flex: 1 },
  moduleName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  moduleStats: { fontSize: 14 },
  expandIcon: { fontSize: 16, marginLeft: 8 },
  chapterList: { paddingHorizontal: 16, paddingBottom: 16 },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  chapterIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lockIcon: { fontSize: 16 },
  checkIcon: { fontSize: 20 },
  chapterNumber: { fontSize: 16, fontWeight: '700' },
  chapterInfo: { flex: 1 },
  chapterName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  chapterType: { fontSize: 12 },
  chapterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chapterButtonText: { fontSize: 12, fontWeight: '600' },
  bottomSpacer: { height: 80 },
});
