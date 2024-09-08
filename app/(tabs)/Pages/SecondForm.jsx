import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Foundation from '@expo/vector-icons/Foundation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SecondForm() {

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [agegroup, setAgegroup] = useState(''); // State for age group
  const [gamelevel, setGamelevel] = useState(''); // State for game level
  const [performance, setPerformance] = useState(''); // State for best performance

  // Validate inputs
  const validateForm = () => {
    if (!agegroup || !gamelevel || !performance) {
      Alert.alert('Error', 'Please fill all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await AsyncStorage.setItem('gameDetails', JSON.stringify({ agegroup, gamelevel, performance }));
      router.push("(tabs)/Pages/ThirdForm");
    } catch (error) {
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

        {/* Age group input field */}
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

        {/* Game level input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game Level</Text>
          <TextInput
            style={styles.input}
            value={gamelevel}
            onChangeText={setGamelevel}
            placeholder="Enter your game level"
          />
        </View>

        {/* Best performance input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Best Performance</Text>
          <TextInput
            style={styles.input}
            value={performance}
            onChangeText={setPerformance}
            placeholder="Your Best Performance"
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// Styling for the form
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
