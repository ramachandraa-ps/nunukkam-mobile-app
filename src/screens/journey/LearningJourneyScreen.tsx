import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const LearningJourneyScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  
  const student = data.getCurrentStudent();
  const tasks = data.getAllTasks();

  const overallProgress = Math.round(
    ((student?.progress.chaptersCompleted || 0) + (student?.progress.assessmentsCompleted || 0)) /
    ((student?.progress.totalChapters || 1) + (student?.progress.totalAssessments || 1)) * 100
  );

  const taskCompletion = Math.round(
    (tasks.filter((t: any) => t.status === 'completed').length / tasks.length) * 100
  );

  const proficiency = student?.proficiency || { expert: 0, intermediate: 0, novice: 0 };
  const totalProficiency = proficiency.expert + proficiency.intermediate + proficiency.novice || 1;
  const expertPercentage = Math.round((proficiency.expert / totalProficiency) * 100);
  const intermediatePercentage = Math.round((proficiency.intermediate / totalProficiency) * 100);
  const novicePercentage = Math.round((proficiency.novice / totalProficiency) * 100);

  const corporateReady = expertPercentage;

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Learning Journey</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Overall Progress */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Overall Progress</Text>
            <View style={styles.progressCircleContainer}>
              <View style={[styles.progressCircle, { borderColor: colors.border }]}>
                <Text style={[styles.progressPercentage, { color: colors.text }]}>
                  {overallProgress}%
                </Text>
                <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                  Complete
                </Text>
              </View>
            </View>
            <Text style={[styles.progressDetails, { color: colors.textSecondary }]}>
              {student?.progress.chaptersCompleted} chapters + {student?.progress.assessmentsCompleted} assessments completed
            </Text>
          </View>

          {/* Task Completion */}
          <TouchableOpacity
            style={[styles.card, styles.taskCard, { backgroundColor: colors.card }]}
            onPress={() => navigation.navigate('TaskDetail' as never)}
          >
            <View style={styles.taskContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Task Completion</Text>
              <Text style={[styles.taskStats, { color: colors.textSecondary }]}>
                {tasks.filter(t => t.status === 'completed').length}/{tasks.length} tasks ({taskCompletion}%) completed
              </Text>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View
                  style={[styles.progressFill, { backgroundColor: colors.primary, width: `${taskCompletion}%` }]}
                />
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Skills Accomplished */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.skillsHeader}>
              <View style={styles.skillsHeaderText}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  You are {corporateReady}% corporate ready
                </Text>
                <Text style={[styles.skillsSubtitle, { color: colors.textSecondary }]}>
                  Based on your completed skills
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.skillsButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => navigation.navigate('YourPerformance' as never)}
              >
                <Text style={[styles.skillsButtonIcon, { color: colors.primary }]}>→</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.skillsChart}>
              <View style={styles.pieChartPlaceholder}>
                <Text style={styles.pieEmoji}>📊</Text>
              </View>
              <View style={styles.skillsLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FFA500' }]} />
                  <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Expert</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]}>
                    {expertPercentage}%
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#7E57C2' }]} />
                  <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Intermediate</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]}>
                    {intermediatePercentage}%
                  </Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#50C878' }]} />
                  <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Novice</Text>
                  <Text style={[styles.legendValue, { color: colors.text }]}>
                    {novicePercentage}%
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* This Week's Content */}
          <View style={styles.contentSection}>
            <View style={styles.contentHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>This Week's Content</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CoreSkills' as never)}>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contentScroll}>
              {[1, 2, 3].map((item: number) => (
                <View key={item} style={[styles.contentCard, { backgroundColor: colors.card }]}>
                  <View style={[styles.contentImage, { backgroundColor: colors.border }]}>
                    <Text style={styles.contentEmoji}>📖</Text>
                  </View>
                  <Text style={[styles.contentTitle, { color: colors.text }]}>
                    Ch. {item}: Topic Name
                  </Text>
                  <View style={[styles.badge, { backgroundColor: item === 1 ? '#50C878' : item === 2 ? '#FFA500' : colors.border }]}>
                    <Text style={[styles.badgeText, { color: item === 3 ? colors.text : '#FFFFFF' }]}>
                      {item === 1 ? 'Completed' : item === 2 ? 'In Progress' : 'Not Started'}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Your Badges */}
          <View style={styles.badgesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Badges</Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <View style={styles.emptyBadges}>
                <View style={[styles.badgeIconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={styles.badgeIconLarge}>🏆</Text>
                </View>
                <Text style={[styles.emptyBadgesTitle, { color: colors.text }]}>No Badges Yet</Text>
                <Text style={[styles.emptyBadgesText, { color: colors.textSecondary }]}>
                  Badges earned in class activities will appear here. Keep learning!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  progressCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: '800',
  },
  progressLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  progressDetails: {
    fontSize: 16,
    textAlign: 'center',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskStats: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  chevron: {
    fontSize: 32,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  skillsHeaderText: {
    flex: 1,
  },
  skillsSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  skillsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillsButtonIcon: {
    fontSize: 20,
    fontWeight: '700',
  },
  skillsChart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pieChartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieEmoji: {
    fontSize: 48,
  },
  skillsLegend: {
    flex: 1,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    flex: 1,
    fontSize: 14,
  },
  legendValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentSection: {
    marginTop: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentScroll: {
    paddingLeft: 16,
  },
  contentCard: {
    width: 180,
    marginRight: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  contentEmoji: {
    fontSize: 32,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgesSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  emptyBadges: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badgeIconLarge: {
    fontSize: 32,
  },
  emptyBadgesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyBadgesText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 80,
  },
});
