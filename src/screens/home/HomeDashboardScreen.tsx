import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Avatar } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Task, Notification } from '../../types';

export const HomeDashboardScreen = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const data = useData();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  let student: any = null;
  let tasks: Task[] = [];
  let notifications: Notification[] = [];
  
  try {
    student = data.getCurrentStudent();
    tasks = data.getAllTasks();
    notifications = data.getAllNotifications();
  } catch (error) {
    console.error('Error loading data:', error);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const pendingTasks = tasks.filter((t: Task) => t.status !== 'completed').slice(0, 3);

  const getTaskColor = (status: string) => {
    switch (status) {
      case 'overdue': return '#D9534F';
      case 'today': return '#FFA500';
      default: return '#7E57C2';
    }
  };

  const getTaskAction = (action: string) => {
    switch (action) {
      case 'start': return 'Start';
      case 'resume': return 'Resume';
      case 'retake': return 'Retake';
      default: return 'View';
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <View style={styles.headerLeft}>
            <Text style={styles.logoIcon}>📚</Text>
            <Text style={[styles.logoText, { color: colors.text }]}>Nunukkam</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile' as never)}>
              <Avatar
                source={student?.profilePicture}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Welcome Card */}
          <View style={[styles.welcomeCard, { backgroundColor: colors.primary }]}>
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>Welcome back, {user?.name}!</Text>
              <Text style={styles.welcomeSubtitle}>
                Keep up the great work. Every step you take is a step towards success.
              </Text>
            </View>
          </View>

          {/* Learning Progress */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Your Learning Progress</Text>
            
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>Modules</Text>
                <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
                  {student?.progress.modulesCompleted}/{student?.progress.totalModules}
                </Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: '#50C878',
                      width: `${((student?.progress.modulesCompleted || 0) / (student?.progress.totalModules || 1)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressPercentage, { color: colors.textSecondary }]}>
                {Math.round(((student?.progress.modulesCompleted || 0) / (student?.progress.totalModules || 1)) * 100)}%
              </Text>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>Chapters</Text>
                <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
                  {student?.progress.chaptersCompleted}/{student?.progress.totalChapters}
                </Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: '#50C878',
                      width: `${((student?.progress.chaptersCompleted || 0) / (student?.progress.totalChapters || 1)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressPercentage, { color: colors.textSecondary }]}>
                {Math.round(((student?.progress.chaptersCompleted || 0) / (student?.progress.totalChapters || 1)) * 100)}%
              </Text>
            </View>

            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>Assessments</Text>
                <Text style={[styles.progressCount, { color: colors.textSecondary }]}>
                  {student?.progress.assessmentsCompleted}/{student?.progress.totalAssessments}
                </Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: '#50C878',
                      width: `${((student?.progress.assessmentsCompleted || 0) / (student?.progress.totalAssessments || 1)) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.progressPercentage, { color: colors.textSecondary }]}>
                {Math.round(((student?.progress.assessmentsCompleted || 0) / (student?.progress.totalAssessments || 1)) * 100)}%
              </Text>
            </View>
          </View>

          {/* Attendance */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Your Attendance</Text>
              <Text style={[styles.attendancePercentage, { color: '#50C878' }]}>
                {student?.attendance ? Math.round((student.attendance.filter((a: any) => a.status === 'present').length / (student.attendance.length || 1)) * 100) : 0}%
              </Text>
            </View>
            <Text style={[styles.calendarPlaceholder, { color: colors.textSecondary }]}>
              📅 Calendar view coming soon
            </Text>
          </View>

          {/* Pending Tasks */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Pending Tasks</Text>
              <TouchableOpacity onPress={() => (navigation as any).navigate('Journey', { screen: 'TaskDetail' })}>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {pendingTasks.map((task: Task) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={[styles.taskIndicator, { backgroundColor: getTaskColor(task.priority) }]} />
                <View style={styles.taskContent}>
                  <Text style={[styles.taskTitle, { color: colors.text }]}>{task.title}</Text>
                  <Text style={[styles.taskDeadline, { color: colors.textSecondary }]}>
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </Text>
                </View>
                <TouchableOpacity style={[styles.taskButton, { backgroundColor: colors.primary }]}>
                  <Text style={styles.taskButtonText}>{task.actionLabel}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Updates */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Updates</Text>
            
            {notifications.slice(0, 3).map((notification: Notification) => (
              <View key={notification.id} style={[styles.notificationItem, { backgroundColor: colors.primary + '10' }]}>
                <View style={styles.notificationIcon}>
                  <Text style={styles.notificationEmoji}>
                    {notification.type === 'assessment' ? '✅' : notification.type === 'announcement' ? '📄' : '📢'}
                  </Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={[styles.notificationTitle, { color: colors.text }]}>
                    {notification.title}
                  </Text>
                  <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>
                    {notification.message}
                  </Text>
                </View>
                {!notification.isRead && (
                  <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
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
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    fontSize: 24,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  welcomeCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    overflow: 'hidden',
  },
  welcomeContent: {
    zIndex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressCount: {
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 14,
    textAlign: 'right',
  },
  attendancePercentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  calendarPlaceholder: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  taskIndicator: {
    width: 6,
    height: 40,
    borderRadius: 3,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  taskDeadline: {
    fontSize: 14,
  },
  taskButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  taskButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationEmoji: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 80,
  },
});
