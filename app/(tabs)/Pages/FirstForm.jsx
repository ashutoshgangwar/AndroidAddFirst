import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Fontisto from "@expo/vector-icons/Fontisto";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstForm() {
  const navigation = useNavigation();
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');  // Use consistent token key
      console.log('Retrieved token:', token);

      if (!token) {
        Alert.alert('Error', 'You are not authenticated');
        return;
      }

      const response = await fetch('http://192.168.0.103:6000/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, age, city, state }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Data submitted successfully');
        router.push("(tabs)/Pages/SecondForm");
      } else {
        Alert.alert('Error', data.error || 'Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          Welcome to Fitness{" "}
          <Fontisto name="world" size={60} color="black" /> World (1).
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Enter your Age"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your City"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholder="Enter your State"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE, padding: 25 },
  contentContainer: { paddingBottom: 50 },
  title: { padding: 10, fontWeight: "bold", fontSize: 30, marginTop: 15, textAlign: "center" },
  inputContainer: { marginTop: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: { padding: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.DIMMYGRAY, marginTop: 5, width: "100%" },
  button: { padding: 15, backgroundColor: Colors.PRIMERY, borderRadius: 40, marginTop: 50 },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 17 },
});
