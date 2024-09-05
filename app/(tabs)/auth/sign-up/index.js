import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!fullname || !email || !phonenumber || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      // const response = await fetch('http://192.168.0.103:6000/signup'
        const response = await fetch('http://192.168.29.46:6000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, phonenumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Congratulations, you have Signed-Up');
        router.push("(tabs)/auth/sign-in");
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
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
          fontWeight:"bold",
           textAlign:"center"

        }}
      >
        Let's Sign you Up
      </Text>

      <Text
        style={{
          fontSize: 25,
          padding: 5,
          color: Colors.GRAY,
          marginLeft: 20,
          marginTop: 10,
          fontWeight:'bold',
          textAlign:"center",
          textDecorationLine:"underline"
        
        }}
      >
        Welcome to you
      </Text>

    

      {/* User Name */}
      <View style={{ marginTop: 20, fontWeight:'bold'}}>
        <Text 
        style={style.inputText}
        > Full Name</Text>

        <TextInput
          style={style.input}
          value={fullname}
          onChangeText={setFullname}
          placeholder="Enter your full name"
        />
      </View>

      {/* Email Address */}
      <View style={{ marginTop: 20 }}>
        <Text
         style={style.inputText}
        > Email </Text>

        <TextInput
          style={style.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
        />
      </View>

      {/* Phone number */}
      <View style={{ marginTop: 20 }}>
        <Text
         style={style.inputText}
        > Phone Number </Text>

        <TextInput
          style={style.input}
          value={phonenumber}
          onChangeText={setPhonenumber}
          placeholder="Enter your Contact Number"
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text
          style={style.inputText}
        > Password</Text>

        <TextInput
          secureTextEntry={true}
          style={style.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your Password"
        />
      </View>

      {/* Create Account */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMERY,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Sign Up
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
    borderColor: Colors.DIMMYGRAY, // Change this from borderBlockColor to borderColor
    marginTop: 20,
  },
  inputText:{
    fontSize:15,
    fontWeight:"bold"
  }
});
