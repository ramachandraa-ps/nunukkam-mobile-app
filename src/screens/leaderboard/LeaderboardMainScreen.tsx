import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Avatar } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useData } from '../../contexts/DataContext';
import { Leaderboard, LeaderboardEntry } from '../../types';

export const LeaderboardMainScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const data = useData();
  const [scope, setScope] = useState<'class' | 'college' | 'nunukkam'>('class');

  const scopes = [
    { key: 'class', label: 'In Class' },
    { key: 'college', label: 'In College' },
    { key: 'nunukkam', label: 'At Nunukkam' },
  ];

  const leaderboard = data.getLeaderboard();
  const topThree = leaderboard.slice(0, 3);
  const currentUser = leaderboard.find((e: LeaderboardEntry) => e.studentId === 'current-user');

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Leaderboard</Text>
        </View>

        <View style={styles.filterContainer}>
          {scopes.map((s) => (
            <TouchableOpacity
              key={s.key}
              style={[
                styles.filterChip,
                {
                  backgroundColor: scope === s.key ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setScope(s.key as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: scope === s.key ? '#FFFFFF' : colors.text },
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.scrollView}>
          {currentUser && (
            <View style={[styles.userRankCard, { backgroundColor: colors.card }]}>
              <View style={styles.userRankHeader}>
                <Avatar
                  source={currentUser.profilePicture}
                  size={48}
                />
                <View style={styles.userRankInfo}>
                  <Text style={[styles.userRankName, { color: colors.text }]}>
                    {currentUser.studentName}
                  </Text>
                  <Text style={[styles.userRankPosition, { color: colors.textSecondary }]}>
                    Rank #{currentUser.rank}
                  </Text>
                </View>
                <Text style={[styles.userPoints, { color: colors.primary }]}>
                  {currentUser.points} pts
                </Text>
              </View>
              <View style={styles.proficiencyBar}>
                <View
                  style={[
                    styles.proficiencySegment,
                    {
                      backgroundColor: '#50C878',
                      width: `${currentUser.proficiency.expert}%`,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.proficiencySegment,
                    {
                      backgroundColor: '#FFA500',
                      width: `${currentUser.proficiency.intermediate}%`,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.proficiencySegment,
                    {
                      backgroundColor: '#7E57C2',
                      width: `${currentUser.proficiency.novice}%`,
                    },
                  ]}
                />
              </View>
            </View>
          )}

          <View style={[styles.podiumCard, { backgroundColor: colors.card }]}>
            <View style={styles.podium}>
              {topThree[1] && (
                <View style={styles.podiumPosition}>
                  <Avatar
                    source={topThree[1].profilePicture}
                    size={56}
                  />
                  <View style={[styles.podiumRank, styles.silverRank]}>
                    <Text style={styles.podiumRankText}>2</Text>
                  </View>
                  <Text style={[styles.podiumName, { color: colors.text }]}>
                    {topThree[1].studentName.split(' ')[0]}
                  </Text>
                  <Text style={[styles.podiumPoints, { color: colors.textSecondary }]}>
                    {topThree[1].points} pts
                  </Text>
                </View>
              )}

              {topThree[0] && (
                <View style={[styles.podiumPosition, styles.firstPosition]}>
                  <View style={styles.crownContainer}>
                    <Text style={styles.crown}>👑</Text>
                  </View>
                  <Avatar
                    source={topThree[0].profilePicture}
                    size={72}
                  />
                  <View style={[styles.podiumRank, styles.goldRank]}>
                    <Text style={styles.podiumRankText}>1</Text>
                  </View>
                  <Text style={[styles.podiumName, { color: colors.text }]}>
                    {topThree[0].studentName.split(' ')[0]}
                  </Text>
                  <Text style={[styles.podiumPoints, { color: colors.textSecondary }]}>
                    {topThree[0].points} pts
                  </Text>
                </View>
              )}

              {topThree[2] && (
                <View style={styles.podiumPosition}>
                  <Avatar
                    source={topThree[2].profilePicture}
                    size={56}
                  />
                  <View style={[styles.podiumRank, styles.bronzeRank]}>
                    <Text style={styles.podiumRankText}>3</Text>
                  </View>
                  <Text style={[styles.podiumName, { color: colors.text }]}>
                    {topThree[2].studentName.split(' ')[0]}
                  </Text>
                  <Text style={[styles.podiumPoints, { color: colors.textSecondary }]}>
                    {topThree[2].points} pts
                  </Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.viewAllButton, { backgroundColor: colors.primary }]}
            onPress={() => (navigation as any).navigate('FullLeaderboard', { scope })}
          >
            <Text style={styles.viewAllText}>View Full Leaderboard</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: { fontSize: 14, fontWeight: '600' },
  scrollView: { flex: 1 },
  userRankCard: {
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
  userRankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userRankInfo: { flex: 1, marginLeft: 12 },
  userRankName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  userRankPosition: { fontSize: 14 },
  userPoints: { fontSize: 18, fontWeight: '700' },
  proficiencyBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  proficiencySegment: {
    height: '100%',
  },
  podiumCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 16,
  },
  podiumPosition: {
    alignItems: 'center',
    flex: 1,
  },
  firstPosition: {
    marginBottom: -16,
  },
  crownContainer: {
    marginBottom: 8,
  },
  crown: { fontSize: 32 },
  podiumRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    marginBottom: 8,
  },
  goldRank: { backgroundColor: '#FFD700' },
  silverRank: { backgroundColor: '#C0C0C0' },
  bronzeRank: { backgroundColor: '#CD7F32' },
  podiumRankText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  podiumName: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  podiumPoints: { fontSize: 12 },
  viewAllButton: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  bottomSpacer: { height: 80 },
});
