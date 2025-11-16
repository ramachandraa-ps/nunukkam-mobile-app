import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const AssessmentResultsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { score, proficiency } = (route.params as any) || { score: 85, proficiency: 'expert' };

  const getProficiencyColor = (level: string) => {
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
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)} style={styles.backButton}>
            <Text style={styles.backIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Assessment Results</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.resultCard, { backgroundColor: colors.card }]}>
            <View style={styles.scoreCircle}>
              <Text style={[styles.scoreText, { color: getProficiencyColor(proficiency) }]}>
                {score}%
              </Text>
              <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>Score</Text>
            </View>

            <View style={[styles.proficiencyBadge, { backgroundColor: getProficiencyColor(proficiency) + '20' }]}>
              <Text style={[styles.proficiencyText, { color: getProficiencyColor(proficiency) }]}>
                {proficiency.toUpperCase()}
              </Text>
            </View>

            <Text style={[styles.congratsText, { color: colors.text }]}>
              {proficiency === 'expert' ? 'Excellent Work!' : 'Good Effort!'}
            </Text>
            <Text style={[styles.messageText, { color: colors.textSecondary }]}>
              {proficiency === 'expert'
                ? 'You have mastered this topic. Keep up the great work!'
                : 'You can improve your score by retaking the assessment.'}
            </Text>
          </View>

          <View style={[styles.rankingCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Your Ranking</Text>
            <View style={styles.rankingItem}>
              <Text style={[styles.rankingLabel, { color: colors.textSecondary }]}>In Class</Text>
              <Text style={[styles.rankingValue, { color: colors.text }]}>11th position</Text>
            </View>
            <View style={styles.rankingItem}>
              <Text style={[styles.rankingLabel, { color: colors.textSecondary }]}>In College</Text>
              <Text style={[styles.rankingValue, { color: colors.text }]}>19th position</Text>
            </View>
            <View style={styles.rankingItem}>
              <Text style={[styles.rankingLabel, { color: colors.textSecondary }]}>At Nunukkam</Text>
              <Text style={[styles.rankingValue, { color: colors.text }]}>60th position</Text>
            </View>
          </View>

          <View style={styles.actions}>
            {proficiency !== 'expert' && (
              <Button
                title="Retake Assessment"
                onPress={() => navigation.goBack()}
                fullWidth
              />
            )}
            {proficiency === 'expert' && (
              <Button
                title="View Certificate"
                onPress={() => {}}
                variant="outline"
                fullWidth
              />
            )}
            <Button
              title="Back to Dashboard"
              onPress={() => navigation.navigate('Home' as never)}
              variant="outline"
              fullWidth
            />
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
  resultCard: {
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
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scoreText: { fontSize: 48, fontWeight: '800' },
  scoreLabel: { fontSize: 16, marginTop: 4 },
  proficiencyBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  proficiencyText: { fontSize: 14, fontWeight: '700' },
  congratsText: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  messageText: { fontSize: 16, textAlign: 'center' },
  rankingCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  rankingLabel: { fontSize: 16 },
  rankingValue: { fontSize: 16, fontWeight: '600' },
  actions: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bottomSpacer: { height: 80 },
});
