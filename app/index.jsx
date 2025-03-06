import { useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constant/Color";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
;
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../context/userDetailContext";

export default function Index() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Authenticated User:", user);

        try {
          const result = await getDoc(doc(db, "users", user.email));
          if (result.exists()) {
            setUserDetail(result.data());
            router.replace("(tabs)/home"); // Ensure correct navigation path
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image 
        source={require("../assets/images/landing.png")} 
        style={{ width: "100%", height: 300, marginTop: 70 }} 
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Coaching Guru</Text>
        
        <Text style={styles.description}>
          🚀 Transform Your Ideas into Engaging Educational Content ✨ Effortlessly with AI! 🤖🔥
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/Login/signup")}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started</Text>
        </TouchableOpacity>

        {/* Already have an account button */}
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={() => router.push("/Login/signin")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.WHITE,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    padding: 17,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.WHITE,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
