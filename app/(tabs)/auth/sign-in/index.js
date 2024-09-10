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

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.103:6000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      if (response.ok && data.token) {
        // Save both token and userId to AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userId', data.userId); // Save userId
  
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserId = await AsyncStorage.getItem('userId'); // Retrieve userId
        console.log('Stored Token:', storedToken);
        console.log('Stored User ID:', storedUserId);
  
        if (storedToken && storedUserId) {
          // router.replace("./../../Journey");
          router.replace("./../../(tab)/Profile");
        } else {
          Alert.alert('Storage Error', 'Unable to store token or user ID');
        }
      } else {
        Alert.alert('Login failed', data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Network error', 'Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };
  

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
