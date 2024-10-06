import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from "react-native"; // Ensure TextInput is imported
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from "@expo/vector-icons/FontAwesome";

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

  // Create an array for weight options (30 to 100 kg)
  const weightOptions = [];
  for (let i = 30; i <= 100; i++) {
    weightOptions.push(<Picker.Item key={i} label={`${i} Kg`} value={`${i}`} />);
  }

  // Create an array for height options (120 to 198 cm)
  const heightOptions = [];
  for (let i = 120; i <= 198; i++) {
    heightOptions.push(<Picker.Item key={i} label={`${i} cm`} value={`${i}`} />);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./../Journey")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.title}>Your personal Details (1).</Text>
        

        <View style={styles.inputContainer}>
  <Text style={styles.label}>Weight</Text>
  {/* Wrapped Picker inside a View to apply border and padding */}
  <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={weight}
      onValueChange={(itemValue) => setWeight(itemValue)}
    >
      <Picker.Item label="Select Weight" value="" />
      {Array.from({ length: 71 }, (_, i) => i + 30).map((value) => (
        <Picker.Item key={value} label={`${value} Kg`} value={value.toString()} />
      ))}
    </Picker>
  </View>
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Height</Text>
  {/* Wrapped Picker inside a View to apply border and padding */}
  <View style={styles.pickerWrapper}>
    <Picker
      selectedValue={height}
      onValueChange={(itemValue) => setHeight(itemValue)}
    >
      <Picker.Item label="Select Height" value="" />
      {Array.from({ length: 79 }, (_, i) => i + 120).map((value) => (
        <Picker.Item key={value} label={`${value} cm`} value={value.toString()} />
      ))}
    </Picker>
  </View>
</View>


        {/* Blood group input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={bloodgroup}
            onValueChange={(itemValue) => setBloodgroup(itemValue)}
          >
            <Picker.Item label="Select Blood Grouup" value="" />

            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
          </View>
        </View>

        {/* Diet preference input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diet Preference</Text>
          <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={diet}
            onValueChange={(itemValue) => setDiet(itemValue)}
          >
            <Picker.Item label="Select your diet prefrence" value="" />

            <Picker.Item label="Vegitarian" value="Veg" />
            <Picker.Item label="Non-Vegitarian" value="Non_veg" />
            <Picker.Item label="Vegan" value="Vegan" />
           
          </Picker>
          </View>
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
  container: { 
    flex: 1, 
    backgroundColor: Colors.WHITE, 
    padding: 25 
  },
  contentContainer: { 
    paddingBottom: 50 
  },
  title: { 
    padding: 10, 
    fontWeight: "bold", 
    fontSize: 30, 
    marginTop: 15, 
    textAlign: "center" 
  },
  inputContainer: { 
    marginTop: 20 
  },
  label: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    paddingHorizontal: 10, // Padding inside the picker to match input style
    backgroundColor: Colors.WHITE, // Same background as input
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    width: "100%",
    backgroundColor: Colors.WHITE
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 40,
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 17,
    textAlign: "center"
  }
});
