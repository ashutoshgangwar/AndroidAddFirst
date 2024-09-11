import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  async function checkUserData(token) {
    try {
      const response = await fetch('http://192.168.0.103:6000/userdata', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched User Data:', data);
  
        if (data.message === "No data found") {
          return false;
        }
  
        return true;
      } else {
        // console.error('Error fetching user data:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }

  async function handleSignIn() {
    setLoading(true); // Start loading indicator
    try {
      // Log in and get the token
      const loginResponse = await fetch('http://192.168.0.103:6000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const loginData = await loginResponse.json();
      
      if (loginResponse.ok && loginData.token && loginData.userId) {
        const token = loginData.token;
        const userId = loginData.userId;

        // Save both token and userId in AsyncStorage
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', userId);

        console.log('User token and ID saved:', { token, userId });
        
        // Check if user data is already saved
        const isDataSaved = await checkUserData(token);
  
        if (isDataSaved) {
          console.log('User data exists, navigating to Profile');
          router.replace("./../../Profile");
        } else {
          console.log('No user data found, navigating to Journey');
          router.replace("./../../Journey");
        }
      } else {
        console.error('Login failed:', loginData.message);
        Alert.alert('Login Failed', loginData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Network Error', 'Please check your internet connection.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Start your Journey</Text>
      <Text style={styles.subtitle}>Welcome to you</Text>
      <Text style={styles.loginText}>User Login</Text>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={styles.createAccount}
      >
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: Colors.WHITE, height: '100%' },
  title: { fontSize: 30, padding: 25, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 25, padding: 5, color: Colors.GRAY, textAlign: "center", textDecorationLine: "underline" },
  loginText: { fontSize: 40, padding: 5, color: Colors.PRIMERY, textAlign: "center", fontWeight: "bold" },
  inputContainer: { marginTop: 20 },
  input: { padding: 15, borderWidth: 1, borderRadius: 15, borderColor: Colors.DIMMYGRAY, marginTop: 20 },
  button: { padding: 15, backgroundColor: Colors.PRIMERY, borderRadius: 15, marginTop: 20, alignItems: 'center' },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 15 },
  createAccount: { padding: 15, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 20, borderWidth: 1, alignItems: 'center' },
  createAccountText: { color: Colors.PRIMARY, textAlign: "center", fontSize: 20, fontWeight: "bold" },
});
