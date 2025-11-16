import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaWrapper } from '../../components/layout';
import { Button } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';

export const MCQAssessmentScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: 'Which programming language is known for web development?',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    (navigation as any).navigate('AssessmentResults', { score: 85, proficiency: 'expert' });
  };

  return (
    <SafeAreaWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>MCQ Assessment</Text>
          <View style={[styles.timer, { backgroundColor: colors.danger + '20' }]}>
            <Text style={[styles.timerText, { color: colors.danger }]}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.questionNumber, { color: colors.textSecondary }]}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <Text style={[styles.questionText, { color: colors.text }]}>
              {questions[currentQuestion].text}
            </Text>

            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: selectedAnswers[currentQuestion] === index ? colors.primary + '20' : colors.background,
                      borderColor: selectedAnswers[currentQuestion] === index ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: index })}
                >
                  <View
                    style={[
                      styles.radio,
                      {
                        borderColor: selectedAnswers[currentQuestion] === index ? colors.primary : colors.border,
                        backgroundColor: selectedAnswers[currentQuestion] === index ? colors.primary : 'transparent',
                      },
                    ]}
                  />
                  <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.navigation}>
            {currentQuestion > 0 && (
              <Button
                title="Previous"
                onPress={() => setCurrentQuestion(currentQuestion - 1)}
                variant="outline"
              />
            )}
            {currentQuestion < questions.length - 1 ? (
              <Button
                title="Next"
                onPress={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={selectedAnswers[currentQuestion] === undefined}
              />
            ) : (
              <Button
                title="Submit"
                onPress={handleSubmit}
                disabled={Object.keys(selectedAnswers).length !== questions.length}
              />
            )}
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
  timer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerText: { fontSize: 14, fontWeight: '700' },
  scrollView: { flex: 1 },
  questionCard: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionNumber: { fontSize: 14, marginBottom: 12 },
  questionText: { fontSize: 18, fontWeight: '600', marginBottom: 24 },
  optionsContainer: { gap: 12 },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
  },
  optionText: { fontSize: 16, flex: 1 },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  bottomSpacer: { height: 80 },
});
