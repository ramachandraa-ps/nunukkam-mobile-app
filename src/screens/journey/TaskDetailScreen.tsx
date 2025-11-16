import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const TaskDetailScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  const tasks = data.getAllTasks();
  const [filter, setFilter] = useState<string>('all');

  const filters = ['all', 'overdue', 'today', 'upcoming', 'completed'];

  const filteredTasks = tasks.filter((task: any) => {
    if (filter === 'all') return true;
    if (filter === 'overdue') return task.status === 'overdue';
    if (filter === 'today') return task.priority === 'high';
    if (filter === 'upcoming') return task.status === 'pending' || task.status === 'in-progress';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'overdue': return '#D9534F';
      case 'high': return '#FFA500';
      case 'medium': return '#7E57C2';
      default: return '#50C878';
    }
  };

  const getActionButton = (action: string) => {
    switch (action) {
      case 'start': return 'Start';
      case 'resume': return 'Resume';
      case 'retake': return 'Retake';
      case 'review': return 'Review';
      default: return 'View';
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Tasks</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                { backgroundColor: filter === f ? colors.primary : colors.card },
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: filter === f ? '#FFFFFF' : colors.text },
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.scrollView}>
          {filteredTasks.map((task: any) => (
            <View key={task.id} style={[styles.taskCard, { backgroundColor: colors.card }]}>
              <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
              <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, { color: colors.text }]}>{task.title}</Text>
                <Text style={[styles.taskChapter, { color: colors.textSecondary }]}>
                  {task.description}
                </Text>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { backgroundColor: colors.primary, width: `${task.progress}%` },
                    ]}
                  />
                </View>
                <Text style={[styles.deadline, { color: colors.textSecondary }]}>
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.actionButtonText}>{task.actionLabel}</Text>
              </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: '700' },
  placeholder: { width: 40 },
  filterScroll: { paddingHorizontal: 16, paddingVertical: 12 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: { fontSize: 14, fontWeight: '600' },
  scrollView: { flex: 1 },
  taskCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priorityDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: 12 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  taskChapter: { fontSize: 14, marginBottom: 8 },
  progressBar: { height: 6, borderRadius: 3, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 3 },
  deadline: { fontSize: 12 },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  bottomSpacer: { height: 80 },
});
