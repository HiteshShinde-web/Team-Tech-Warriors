import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Alert, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { useUserDetail } from "../../context/userDetailContext";
import Colors from "../../constant/Color";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { setUser } = useUserDetail();

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (!validateFullName(fullName)) {
      Alert.alert("Error", "Full name should only contain letters and spaces.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true); // Start loading
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user);

      // Save user details to Firestore
      await SaveUser(user);

      // Update context with user details
      setUser({ name: fullName, email, member: false, uid: user.uid });

      Alert.alert("Success", "Account created successfully!");
      router.push("/Login/signin"); // Navigate to the sign-in page
    } catch (error) {
      console.error("Error signing up:", error.message);
      Alert.alert("Error", getFriendlyErrorMessage(error.code));
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const SaveUser = async (user) => {
    const db = getFirestore();
    try {
      await setDoc(doc(db, "users", email), {
        name: fullName,
        email: email,
        member: false,
        uid: user?.uid,
      });
      console.log("User data saved to Firestore");
    } catch (error) {
      console.error("Error saving user data:", error.message);
      throw error;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateFullName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "The email address is already in use.";
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/weak-password":
        return "The password is too weak.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require("./../../assets/images/logo.png")}
          style={styles.logo}
          accessibilityLabel="App Logo"
        />

        <Text style={styles.title}>Create New Account</Text>

        {/* Text Inputs */}
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.TextInput}
          accessibilityLabel="Full Name Input"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.TextInput}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email Input"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.TextInput}
          accessibilityLabel="Password Input"
        />

        {/* Create Account Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
          accessibilityLabel="Create Account Button"
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Already have an account? Section */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/Login/signin")}>
            <Text style={styles.signupLink}>Sign In Here</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
    paddingTop: 100,
    flex: 1,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  TextInput: {
    borderWidth: 1,
    width: "90%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.WHITE,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontFamily: "outfit",
  },
  signupLink: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
});