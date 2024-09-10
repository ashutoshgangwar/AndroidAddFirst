import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Foundation from '@expo/vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThirdForm() {

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [previouscoaching, setPreviouscoaching] = useState(''); // State for game type
  const [coachingplace, setCoachingplace] = useState(''); // State for game played
  const [coachingintrest, setCoachingintrest] = useState(''); // State for game stage

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      // Fetch data from previous forms
      const personalData = JSON.parse(await AsyncStorage.getItem('personalData'));
      const gameDetails = JSON.parse(await AsyncStorage.getItem('gameDetails'));

      // Submit all the data
      const response = await fetch('http://192.168.0.103:6000/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...personalData,
          ...gameDetails,
          previouscoaching,
          coachingplace,
          coachingintrest,
          userId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Data submitted successfully');
        router.push("./Profile_details");
      } else {
        Alert.alert('Error', data.error || 'Failed to submit data');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          <Foundation name="target-two" size={50} color="black" />
          Game Carrier Information (3).
        </Text>

        {/* Game type input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Did you get coaching</Text>
          <TextInput
            style={styles.input}
            value={previouscoaching}
            onChangeText={setPreviouscoaching}
            placeholder="Yes/No"
          />
        </View>

        {/* Game played input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Where do your practice</Text>
          <TextInput
            style={styles.input}
            value={coachingplace}
            onChangeText={setCoachingplace}
            placeholder="Coaching place (School ground/Academy)"
          />
        </View>

        {/* Game stage input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Are you intrested for further coaching</Text>
          <TextInput
            style={styles.input}
            value={coachingintrest}
            onChangeText={setCoachingintrest}
            placeholder="Enter your game stage (Yes/No)"
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
