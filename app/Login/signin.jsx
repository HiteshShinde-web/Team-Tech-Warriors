import { useContext, useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, Alert, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform 
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserDetailContext } from "../../context/userDetailContext";
import Colors from "../../constant/Color";
import { auth } from "../../config/firebaseConfig";

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      setLoading(false);

      navigation.navigate("(tabs)/home", { screen: "Home" });
    } catch (error) {
      console.error("Error signing in:", error.message);
      Alert.alert("Error", getFriendlyErrorMessage(error.code));
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "The email address is invalid.";
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
        <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.TextInput}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email input"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.TextInput}
          accessibilityLabel="Password input"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignIn} 
          disabled={loading}
          accessibilityLabel="Sign in button"
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={{ fontFamily: "outfit" }}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login/signup")}>
            <Text style={styles.signupText}>Sign Up Here</Text>
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
    flexDirection: "row",
    justifyContent: "center",
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
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
});