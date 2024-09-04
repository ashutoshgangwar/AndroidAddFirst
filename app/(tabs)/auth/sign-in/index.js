import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
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
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSignIn = async () => {
    setLoading(true);
  
    try {
      console.log('Request Body:', { email, password }); // Log request body for debugging

      const response = await fetch('http://192.168.0.103:6000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('Response Status:', response.status); // Log response status for debugging

      const data = await response.json();
      console.log('Response Data:', data); // Log the response data for debugging

      if (response.ok) {
        // Navigate to the next screen or show success message
        router.replace("(tabs)/Journey");
      } else {
        // Show error message with detailed info
        Alert.alert('Sign In Failed', data.message || 'Invalid email or password.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network Error:', error); // Log the network error for debugging
      Alert.alert('Network Error', 'Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View
      style={{
        padding: 25,
        marginTop: 0,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          padding: 25,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Let's Start your Journey
      </Text>

      <Text
        style={{
          fontSize: 25,
          padding: 5,
          color: Colors.GRAY,
          marginLeft: 20,
          marginTop: 10,
          fontWeight: 'bold',
          textAlign: "center",
          textDecorationLine: "underline",
        }}
      >
        Welcome to you
      </Text>

      <Text
        style={{
          fontSize: 40,
          padding: 5,
          color: Colors.PRIMERY,
          marginLeft: 20,
          marginTop: 10,
          fontWeight: 'bold',
          textAlign: "center",
          
        }}
      >
        User Login
      </Text>

      {/* Email Address */}
      <View style={{ marginTop: 20, marginTop: 50 }}>
        <Text> Email </Text>
        <TextInput
          style={style.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text> Password</Text>
        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* SignIn Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMERY,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
          alignItems: 'center',
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.WHITE} />
        ) : (
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Sign In
          </Text>
        )}
      </TouchableOpacity>

      {/* Create Account */}
      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 20,
  },
});
