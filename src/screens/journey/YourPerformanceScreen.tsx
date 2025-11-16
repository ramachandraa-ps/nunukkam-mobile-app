import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const YourPerformanceScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  const student = data.getCurrentStudent();
  const [selectedLevel, setSelectedLevel] = useState<'expert' | 'intermediate' | 'novice'>('expert');

  // Mock skills data - in real app this would come from student data
  const skills = [
    { skillName: 'Communication', level: 'expert', percentage: 95 },
    { skillName: 'Problem Solving', level: 'expert', percentage: 90 },
    { skillName: 'Teamwork', level: 'intermediate', percentage: 75 },
    { skillName: 'Leadership', level: 'intermediate', percentage: 70 },
    { skillName: 'Time Management', level: 'novice', percentage: 60 },
  ];
  
  const expertSkills = skills.filter((s: any) => s.level === 'expert');
  const intermediateSkills = skills.filter((s: any) => s.level === 'intermediate');
  const noviceSkills = skills.filter((s: any) => s.level === 'novice');

  const corporateReady = Math.round((expertSkills.length / skills.length) * 100);

  const getSkillsByLevel = () => {
    switch (selectedLevel) {
      case 'expert': return expertSkills;
      case 'intermediate': return intermediateSkills;
      case 'novice': return noviceSkills;
      default: return [];
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return '#50C878';
      case 'intermediate': return '#FFA500';
      case 'novice': return '#7E57C2';
      default: return '#9CA3AF';
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Your Performance</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.corporateReady, { color: colors.text }]}>
              {corporateReady}% corporate ready
            </Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
              You're building momentum. Keep pushing forward!
            </Text>
          </View>

          <View style={styles.levelTabs}>
            <TouchableOpacity
              style={[
                styles.levelTab,
                {
                  backgroundColor: selectedLevel === 'expert' ? '#50C878' : colors.card,
                },
              ]}
              onPress={() => setSelectedLevel('expert')}
            >
              <Text style={[styles.levelTabText, { color: selectedLevel === 'expert' ? '#FFFFFF' : colors.text }]}>
                Expert ({expertSkills.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.levelTab,
                {
                  backgroundColor: selectedLevel === 'intermediate' ? '#FFA500' : colors.card,
                },
              ]}
              onPress={() => setSelectedLevel('intermediate')}
            >
              <Text style={[styles.levelTabText, { color: selectedLevel === 'intermediate' ? '#FFFFFF' : colors.text }]}>
                Intermediate ({intermediateSkills.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.levelTab,
                {
                  backgroundColor: selectedLevel === 'novice' ? '#7E57C2' : colors.card,
                },
              ]}
              onPress={() => setSelectedLevel('novice')}
            >
              <Text style={[styles.levelTabText, { color: selectedLevel === 'novice' ? '#FFFFFF' : colors.text }]}>
                Novice ({noviceSkills.length})
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.skillsList}>
            {getSkillsByLevel().map((skill) => (
              <View key={skill.skillName} style={[styles.skillCard, { backgroundColor: colors.card }]}>
                <View style={styles.skillHeader}>
                  <Text style={[styles.skillName, { color: colors.text }]}>{skill.skillName}</Text>
                  <View style={[styles.levelBadge, { backgroundColor: getLevelColor(skill.level) + '20' }]}>
                    <Text style={[styles.levelBadgeText, { color: getLevelColor(skill.level) }]}>
                      {skill.level}
                    </Text>
                  </View>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { backgroundColor: getLevelColor(skill.level), width: `${skill.percentage}%` },
                    ]}
                  />
                </View>
                <Text style={[styles.percentageText, { color: colors.textSecondary }]}>
                  {skill.percentage}% proficiency
                </Text>
                {selectedLevel !== 'expert' && (
                  <TouchableOpacity style={[styles.retakeButton, { backgroundColor: colors.primary }]}>
                    <Text style={styles.retakeButtonText}>Retake Assessment</Text>
                  </TouchableOpacity>
                )}
                {selectedLevel === 'expert' && (
                  <TouchableOpacity style={[styles.certificateButton, { borderColor: colors.primary }]}>
                    <Text style={[styles.certificateButtonText, { color: colors.primary }]}>
                      View Certificate
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  placeholder: { width: 40 },
  scrollView: { flex: 1 },
  summaryCard: {
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  corporateReady: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  summaryText: { fontSize: 16, textAlign: 'center' },
  levelTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  levelTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  levelTabText: { fontSize: 14, fontWeight: '600' },
  skillsList: { paddingHorizontal: 16 },
  skillCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: { fontSize: 16, fontWeight: '700', flex: 1 },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: { fontSize: 12, fontWeight: '600' },
  progressBar: { height: 8, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 4 },
  percentageText: { fontSize: 14, marginBottom: 12 },
  retakeButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  retakeButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  certificateButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  certificateButtonText: { fontSize: 14, fontWeight: '600' },
  bottomSpacer: { height: 80 },
});
