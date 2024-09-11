import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Foundation from '@expo/vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThirdForm() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // State variables
  const [previouscoaching, setPreviouscoaching] = useState(''); // State for coaching
  const [coachingplace, setCoachingplace] = useState(''); // State for coaching place
  const [coachingintrest, setCoachingintrest] = useState(''); // State for coaching interest

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSubmit = async () => {
    try {
      // Retrieve token and userId from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      // Fetch data from previous forms stored in AsyncStorage
      const personalData = JSON.parse(await AsyncStorage.getItem('personalData'));
      const gameDetails = JSON.parse(await AsyncStorage.getItem('gameDetails'));

      // Ensure token and userId are available
      if (!token || !userId) {
        Alert.alert('Error', 'User authentication information is missing.');
        return;
      }

      // Submit all the data to the API
      const response = await fetch('http://192.168.0.103:6000/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...personalData,    // Personal details from previous form
          ...gameDetails,     // Game details from previous form
          previouscoaching,   // Coaching info from current form
          coachingplace,      // Coaching place info from current form
          coachingintrest,    // Coaching interest info from current form
          userId              // User ID from AsyncStorage
        }),
      });

      // Parse response
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Data submitted successfully');
        // After successful submission, navigate to the profile page
        router.push("./../(tab)/Profile");
      } else {
        // Show the error message from the API response
        Alert.alert('Error', data.error || 'Failed to submit data');
      }
    } catch (error) {
      // Catch any errors and alert the user
      console.error('Error submitting user data:', error);
      Alert.alert('Error', 'Something went wrong while submitting data');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          <Foundation name="target-two" size={50} color="black" />
          Game Carrier Information (3).
        </Text>

        {/* Coaching input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Did you get coaching</Text>
          <TextInput
            style={styles.input}
            value={previouscoaching}
            onChangeText={setPreviouscoaching}
            placeholder="Yes/No"
          />
        </View>

        {/* Coaching place input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Where do you practice</Text>
          <TextInput
            style={styles.input}
            value={coachingplace}
            onChangeText={setCoachingplace}
            placeholder="Coaching place (School ground/Academy)"
          />
        </View>

        {/* Coaching interest input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Are you interested in further coaching?</Text>
          <TextInput
            style={styles.input}
            value={coachingintrest}
            onChangeText={setCoachingintrest}
            placeholder="Enter (Yes/No)"
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Styling for the form
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE, padding: 25 },
  contentContainer: { marginTop: 50, paddingBottom: 50 },
  title: { padding: 10, fontWeight: "bold", fontSize: 30, marginTop: 15, textAlign: "center" },
  inputContainer: { marginTop: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: { padding: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.DIMMYGRAY, marginTop: 5, width: "100%" },
  button: { padding: 15, backgroundColor: Colors.PRIMERY, borderRadius: 40, marginTop: 50 },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 17 },
});
