import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const SessionNotesScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const sessionData = {
    date: 'December 15, 2023',
    time: '2:00 PM',
    mentor: 'Ms. Sarah Johnson',
    discussionPoints: [
      'Reviewed progress on current project',
      'Discussed career goals and pathways',
      'Identified areas for skill improvement',
      'Explored internship opportunities',
    ],
    actionItems: [
      { id: 1, text: 'Complete the React Native tutorial', completed: false },
      { id: 2, text: 'Update resume with recent projects', completed: false },
      { id: 3, text: 'Research companies for internship applications', completed: false },
      { id: 4, text: 'Practice coding interview questions', completed: false },
    ],
  };

  const toggleItem = (id: number) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Session Notes</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sessionInfo, { color: colors.textSecondary }]}>
              {sessionData.date} • {sessionData.time}
            </Text>
            <Text style={[styles.mentorName, { color: colors.text }]}>
              Session with {sessionData.mentor}
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Discussion Points</Text>
            {sessionData.discussionPoints.map((point, index) => (
              <View key={index} style={styles.discussionItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.discussionText, { color: colors.text }]}>{point}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Action Items</Text>
            {sessionData.actionItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.actionItem}
                onPress={() => toggleItem(item.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: checkedItems[item.id] ? colors.primary : 'transparent',
                      borderColor: checkedItems[item.id] ? colors.primary : colors.border,
                    },
                  ]}
                >
                  {checkedItems[item.id] && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.actionText,
                    {
                      color: colors.text,
                      textDecorationLine: checkedItems[item.id] ? 'line-through' : 'none',
                      opacity: checkedItems[item.id] ? 0.6 : 1,
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.background }]}>
              <Text style={[styles.uploadIcon, { color: colors.primary }]}>📎</Text>
              <Text style={[styles.uploadText, { color: colors.primary }]}>Upload Files</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="outline"
            fullWidth
          />
        </View>
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
  card: {
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
  sessionInfo: { fontSize: 14, marginBottom: 8 },
  mentorName: { fontSize: 18, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  discussionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bullet: { fontSize: 16, marginRight: 8, marginTop: 2 },
  discussionText: { flex: 1, fontSize: 16, lineHeight: 24 },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  actionText: { flex: 1, fontSize: 16 },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadIcon: { fontSize: 20, marginRight: 8 },
  uploadText: { fontSize: 16, fontWeight: '600' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  bottomSpacer: { height: 80 },
});
