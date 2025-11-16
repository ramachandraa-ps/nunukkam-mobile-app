import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button, Input } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const ResumeBuilderScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    summary: '',
    qualifications: [],
    internships: [],
    workExperience: [],
    projects: [],
    certifications: [],
    skills: [],
  });

  const steps = [
    'Summary',
    'Qualifications',
    'Internships',
    'Work Experience',
    'Projects',
    'Certifications',
    'Skills',
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Resume Builder</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.stepIndicator}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    {
                      backgroundColor: index <= currentStep ? colors.primary : colors.border,
                    },
                  ]}
                />
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      {
                        backgroundColor: index < currentStep ? colors.primary : colors.border,
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
          <Text style={[styles.stepTitle, { color: colors.text }]}>
            Step {currentStep + 1}: {steps[currentStep]}
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.formCard, { backgroundColor: colors.card }]}>
            {currentStep === 0 && (
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Professional Summary</Text>
                <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
                  Write a brief summary about yourself (max 250 characters)
                </Text>
                <Input
                  value={formData.summary}
                  onChangeText={(text) => setFormData({ ...formData, summary: text })}
                  placeholder="Enter your professional summary..."
                  multiline
                  numberOfLines={6}
                />
              </View>
            )}

            {currentStep === 1 && (
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Qualifications</Text>
                <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
                  Add your educational qualifications
                </Text>
                <Input label="Degree" placeholder="e.g., Bachelor of Science" value="" onChangeText={() => {}} />
                <Input label="Institution" placeholder="e.g., University Name" value="" onChangeText={() => {}} />
                <Input label="Year" placeholder="e.g., 2024" keyboardType="numeric" value="" onChangeText={() => {}} />
                <Input label="Percentage/CGPA" placeholder="e.g., 85%" value="" onChangeText={() => {}} />
                <Button title="+ Add More" variant="outline" fullWidth onPress={() => {}} />
              </View>
            )}

            {currentStep > 1 && (
              <View style={styles.placeholderContent}>
                <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                  {steps[currentStep]} form fields will be added here
                </Text>
              </View>
            )}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <Button
            title={currentStep === 0 ? 'Cancel' : 'Back'}
            onPress={handleBack}
            variant="outline"
          />
          <Button
            title={currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            onPress={handleNext}
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
  progressContainer: { padding: 16 },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    flex: 1,
    height: 2,
  },
  stepTitle: { fontSize: 18, fontWeight: '700' },
  scrollView: { flex: 1 },
  formCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  sectionHint: { fontSize: 14, marginBottom: 16 },
  placeholderContent: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  placeholderText: { fontSize: 16 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  bottomSpacer: { height: 20 },
});
