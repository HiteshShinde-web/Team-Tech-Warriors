import { View, Text, StyleSheet } from 'react-native';

export default function Profit() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profit Overview</Text>
      <Text style={styles.text}>
        Welcome to your Profit Dashboard! Here, you can track your earnings, expenses, and overall financial performance.
      </Text>
      <Text style={styles.text}>
        - Total Earnings: $5,000
        - Total Expenses: $2,000
        - Net Profit: $3,000
      </Text>
      <Text style={styles.text}>
        Stay on top of your finances and make informed decisions to grow your business.
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