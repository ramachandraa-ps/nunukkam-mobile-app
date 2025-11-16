import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Avatar } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';

export const FullLeaderboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const data = useData();
  const scope = (route.params as any)?.scope || 'class';

  const entries = data.getLeaderboard();

  const renderItem = ({ item }: any) => {
    const isCurrentUser = item.studentId === 'current-user';

    return (
      <View
        style={[
          styles.rankItem,
          {
            backgroundColor: isCurrentUser ? colors.primary + '10' : colors.card,
            borderColor: isCurrentUser ? colors.primary : colors.border,
          },
        ]}
      >
        <View style={[styles.rankBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.rankNumber}>{item.rank}</Text>
        </View>
        <Avatar
          source={item.profilePicture}
          size={40}
        />
        <View style={styles.studentInfo}>
          <Text style={[styles.studentName, { color: colors.text }]}>
            {item.studentName}
            {isCurrentUser && <Text style={[styles.youBadge, { color: colors.primary }]}> (You)</Text>}
          </Text>
          <View style={styles.proficiencyBar}>
            <View
              style={[
                styles.proficiencySegment,
                {
                  backgroundColor: '#50C878',
                  width: `${item.proficiencyBreakdown.expert}%`,
                },
              ]}
            />
            <View
              style={[
                styles.proficiencySegment,
                {
                  backgroundColor: '#FFA500',
                  width: `${item.proficiencyBreakdown.intermediate}%`,
                },
              ]}
            />
            <View
              style={[
                styles.proficiencySegment,
                {
                  backgroundColor: '#7E57C2',
                  width: `${item.proficiencyBreakdown.novice}%`,
                },
              ]}
            />
          </View>
        </View>
        <Text style={[styles.points, { color: colors.primary }]}>{item.points}</Text>
      </View>
    );
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Full Leaderboard</Text>
          <View style={styles.placeholder} />
        </View>

        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.studentId}
          contentContainerStyle={styles.listContent}
        />
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
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  studentInfo: { flex: 1, marginLeft: 12 },
  studentName: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  youBadge: { fontSize: 14, fontWeight: '700' },
  proficiencyBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  proficiencySegment: {
    height: '100%',
  },
  points: { fontSize: 16, fontWeight: '700', marginLeft: 12 },
});
