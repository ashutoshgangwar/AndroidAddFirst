import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Foundation from '@expo/vector-icons/Foundation';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstForm() {

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [agegroup, setAgegroup] = useState('');
  const [gamelevel, setGamelevel] = useState('');
  const [performance, setPerformance] = useState('');
  

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
      body: JSON.stringify({ agegroup, gamelevel, performance, userId }), // Include user ID in request body
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Data submitted successfully');
      router.push("(tabs)/Pages/ThirdForm");
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
        <Foundation name="target-two" size={50} color="black" /> 
        Your game details (2).
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game Age Group</Text>
          <TextInput
            style={styles.input}
            value={agegroup}
            onChangeText={setAgegroup}
             keyboardType="numeric"
            placeholder="Enter your Age Group"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game Level</Text>
          <TextInput
            style={styles.input}
            value={gamelevel}
            onChangeText={setGamelevel}
            // keyboardType="numeric"
            placeholder="Enter your game level"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Best Performance</Text>
          <TextInput
            style={styles.input}
            value={performance}
            onChangeText={setPerformance}
            placeholder="Your Best Performance "
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
  contentContainer: { marginTop:50, paddingBottom: 50 },
  title: { padding: 10, fontWeight: "bold", fontSize: 30, marginTop: 15, textAlign: "center" },
  inputContainer: { marginTop: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: { padding: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.DIMMYGRAY, marginTop: 5, width: "100%" },
  button: { padding: 15, backgroundColor: Colors.PRIMERY, borderRadius: 40, marginTop: 50 },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 17 },
});
