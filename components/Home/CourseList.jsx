import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constant/Color'; // Ensure Colors is imported correctly
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import { useRouter } from 'expo-router';
import { imageAssets } from '../../constant/Option'; // Ensure imageAssets is imported correctly

export default function CourseList({ courseList }) {
  const router = useRouter(); // Correctly use the useRouter hook inside the component

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => router.push(`/course-details/${item.id}`)} // Navigate to course details
    >
      <Image
        source={imageAssets[item.image]} // Use the image from imageAssets
        style={styles.courseImage}
      />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
        <View style={styles.courseMeta}>
          <Icon name="user" size={14} color={Colors.Gray} />
          <Text style={styles.courseMetaText}>{item.instructor}</Text>
          <Icon name="clock-o" size={14} color={Colors.Gray} style={styles.metaIcon} />
          <Text style={styles.courseMetaText}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Courses</Text>
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCourseItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    color: Colors.Primary,
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  courseItem: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  courseInfo: {
    padding: 15,
  },
  courseTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.Primary,
    marginBottom: 5,
  },
  courseDescription: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.Gray,
    marginBottom: 10,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaText: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.Gray,
    marginLeft: 5,
  },
  metaIcon: {
    marginLeft: 15,
  },
});