import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstForm() {

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [diet, setDiet] = useState('');

 const handleSubmit = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId'); // Retrieve user ID
    console.log('Retrieved token:', token);
    console.log('Retrieved user ID:', userId); // Log the user ID

    if (!token || !userId) {
      Alert.alert('Error', 'You are not authenticated');
      return;
    }

    const response = await fetch('http://192.168.0.103:6000/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ height, weight, bloodgroup, diet, userId }), // Include user ID in request body
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
          Your personal{" "}
           Details(1).
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
             keyboardType="numeric"
            placeholder="Enter your weightt in KG"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Enter your height in cm."
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Group</Text>
          <TextInput
            style={styles.input}
            value={bloodgroup}
            onChangeText={setBloodgroup}
            placeholder="Your Blood Group "
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diet Prefrence</Text>
          <TextInput
            style={styles.input}
            value={diet}
            onChangeText={setDiet}
            placeholder="Prefrence (Veg/Non-veg/Vegan)"
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
