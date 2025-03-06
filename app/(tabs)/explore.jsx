import { View, Text, StyleSheet } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.text}>
        Discover new opportunities, trends, and resources to enhance your experience.
      </Text>
      <Text style={styles.text}>
        - Trending Topics: AI, Blockchain, Sustainability
        - Recommended Reads: "The Lean Startup", "Atomic Habits"
        - Upcoming Events: Tech Conference 2023, Webinar on Financial Planning
      </Text>
      <Text style={styles.text}>
        Stay curious and keep exploring!
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