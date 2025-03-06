import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000', // Black color for active tab
        tabBarInactiveTintColor: '#808080', // Gray color for inactive tabs
        tabBarStyle: styles.tabBar, // Custom tab bar style
        tabBarLabelStyle: styles.tabBarLabel, // Custom label style
        headerShown: false, // Hide the header for all screens
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Explore',
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Progress',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF', // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Light gray border at the top of the tab bar
  },
  tabBarLabel: {
    fontSize: 12, // Smaller font size for tab labels
    fontWeight: '500', // Medium font weight for tab labels
  },
});