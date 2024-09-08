import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstForm() {

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [height, setHeight] = useState(''); // State for height
  const [weight, setWeight] = useState(''); // State for weight
  const [bloodgroup, setBloodgroup] = useState(''); // State for blood group
  const [diet, setDiet] = useState(''); // State for diet preference

  // Validate inputs
  const validateForm = () => {
    if (!height || !weight || !bloodgroup || !diet) {
      Alert.alert('Error', 'Please fill all fields');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Store form data in AsyncStorage or pass to next screen
      await AsyncStorage.setItem('personalData', JSON.stringify({ height, weight, bloodgroup, diet }));
      router.push("(tabs)/Pages/SecondForm"); // Navigate to second form
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Your personal Details(1).</Text>

        {/* Weight input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter your weight in KG"
          />
        </View>

        {/* Height input field */}
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

        {/* Blood group input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Group</Text>
          <TextInput
            style={styles.input}
            value={bloodgroup}
            onChangeText={setBloodgroup}
            placeholder="Your Blood Group"
          />
        </View>

        {/* Diet preference input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diet Preference</Text>
          <TextInput
            style={styles.input}
            value={diet}
            onChangeText={setDiet}
            placeholder="Preference (Veg/Non-veg/Vegan)"
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
  contentContainer: { paddingBottom: 50 },
  title: { padding: 10, fontWeight: "bold", fontSize: 30, marginTop: 15, textAlign: "center" },
  inputContainer: { marginTop: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: { padding: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.DIMMYGRAY, marginTop: 5, width: "100%" },
  button: { padding: 15, backgroundColor: Colors.PRIMERY, borderRadius: 40, marginTop: 50 },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 17 },
});
