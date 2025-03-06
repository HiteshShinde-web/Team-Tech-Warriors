import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { UserDetailContext } from '../../context/userDetailContext'; 
import { Ionicons } from '@expo/vector-icons';
import NoCourse from './NoCourse'; 

export default function Header({ hasCourses }) { // Accept hasCourses as a prop
  const { userDetail, loading } = useContext(UserDetailContext); 

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" style={styles.loader} />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Hello, {userDetail?.name || 'Guest'}</Text>
          <Text style={styles.subtitle}>Let's get started!</Text>
        </View>

        {/* Settings Icon */}
        <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  subtitle: {
    fontFamily: 'outfit-bold',
    fontSize: 17,
  },
  settingsIcon: {
    marginLeft: 10, 
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
});
