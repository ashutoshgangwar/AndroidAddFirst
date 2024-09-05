import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
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
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [game, setGame] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!fullname || !email || !phonenumber || !dob || !city || !state || !game || !password) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.103:6000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, phonenumber, dob, city, state, game, password }),
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Let's Sign you Up</Text>
      <Text style={styles.subHeaderText}>Welcome to you</Text>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
        />
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholder="Enter your Contact Number"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
            placeholder="Enter your DOB"
          />
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>State</Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholder="Enter your State"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Game</Text>
        <TextInput
          style={styles.input}
          value={game}
          onChangeText={setGame}
          placeholder="Enter your Game Preference"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your Password"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,  // Allow the ScrollView to expand
    justifyContent: 'center',  // Center content vertically
  },
  headerText: {
    fontSize: 30,
    padding: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 25,
    padding: 5,
    color: Colors.GRAY,
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: "center",
    textDecorationLine: "underline",
  },
  formGroup: {
    marginTop: 20,
  },
  doubleFormGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  halfWidth: {
    width: '48%',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 10,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  submitButton: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  submitButtonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
  },
});
