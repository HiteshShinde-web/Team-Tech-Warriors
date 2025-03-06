import { View, Text, StyleSheet } from 'react-native';

export default function Progress() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.text}>
        Track your progress and achievements here. Set goals, monitor your performance, and celebrate your successes!
      </Text>
      <Text style={styles.text}>
        - Completed Tasks: 15/20
        - Goals Achieved: 75%
        - Current Streak: 5 days
      </Text>
      <Text style={styles.text}>
        Keep pushing forward! You're doing great.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});