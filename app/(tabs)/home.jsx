import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
  Text,
} from "react-native";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Color";
import { UserDetailContext } from "../../context/userDetailContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import NoCourse from "../../components/Home/NoCourse";
import CourseList from "../../components/Home/CourseList";


const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetail?.email) {
      GetCourseList();
    } else {
      setLoading(false);
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    try {
      setCourseList([])
      setLoading(true);
      const q = query(
        collection(db, "courses"),
        where("createdBy", "==", userDetail?.email)
      );
      const querySnapshot = await getDocs(q);
  
      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() }); // Add each course to the array
      });
  
      console.log("Fet Courses:", courses); // Debugging: Log fetched courses
      setCourseList(courses); // Update the state with the fetched courses
    } catch (error) {
      console.error("Error fetching course list:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <NoCourse/>

      {/* {courseList?.length==0 ?<NoCourse/> :
      <CourseList courseList={courseList}/>} */}
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: Platform.OS === "ios" ? 45 : 25,
    backgroundColor: Colors.white,
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});