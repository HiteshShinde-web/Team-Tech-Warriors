import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Button from '../Shared/Button';
import Colors from '../../constant/Color';
import { useRouter } from 'expo-router';

const NoCourse = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/book.png')} style={styles.image} />
      <Text style={styles.text}>You don't have any courses</Text>

      <Button
        onPress={() => router.push('/addcourse')}
        type="fill"
        text="+ Create a New Course"
        style={styles.createButton}
      />

      <Button
        onPress={() => router.push('/addcourse')} // Changed route to a meaningful one
        type="outline"
        text="Explore Existing Courses"
        style={styles.exploreButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  createButton: {
    width: '80%',
    backgroundColor: Colors.Primary || '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  exploreButton: {
    width: '80%',
    backgroundColor: Colors.white || '#FFF',
    borderColor: Colors.Primary || '#007BFF',
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoCourse;
