import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import Foundation from "@expo/vector-icons/Foundation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ThirdForm() {
  const navigation = useNavigation();
  const router = useRouter();

  // State variables
  const [previouscoaching, setPreviouscoaching] = useState(""); // State for coaching
  const [coachingplace, setCoachingplace] = useState(""); // State for coaching place
  const [coachingintrest, setCoachingintrest] = useState(""); // State for coaching interest

  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSubmit = async () => {
    // Check if required fields are filled
    if (!previouscoaching, !coachingplace, !coachingintrest) {
      Alert.alert("Error", "Please fill all details");
      return;
    }
  
    try {
      // Retrieve token and userId from AsyncStorage
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
  
      // Fetch data from previous forms stored in AsyncStorage
      const personalData = JSON.parse(
        await AsyncStorage.getItem("personalData")
      );
      const gameDetails = JSON.parse(await AsyncStorage.getItem("gameDetails"));
  
      // Ensure token and userId are available
      if (!token || !userId) {
        Alert.alert("Error", "User authentication information is missing.");
        return;
      }
  
      // Submit all the data to the API
      const response = await fetch("http://192.168.1.4:6000/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...personalData, // Personal details from previous form
          ...gameDetails, // Game details from previous form
          previouscoaching, // Coaching info from current form
          coachingplace, // Coaching place info from current form
          coachingintrest, // Coaching interest info from current form
          userId, // User ID from AsyncStorage
        }),
      });
  
      // Parse response
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", "Data submitted successfully");
        // After successful submission, navigate to the profile page
        router.push("./../(tab)/Home");
      } else {
        // Show the error message from the API response
        Alert.alert("Error", data.error || "Failed to submit data");
      }
    } catch (error) {
      // Catch any errors and alert the user
      console.error("Error submitting user data:", error);
      Alert.alert("Error", "Something went wrong while submitting data");
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./SecondForm")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          <Foundation name="target-two" size={50} color="black" />
          Game Carrier Information (3).
        </Text>

        {/* Coaching input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Did you get coaching/Training</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={previouscoaching}
              onValueChange={(itemValue) => setPreviouscoaching(itemValue)}
            >
              <Picker.Item label="Coaching/Training" value="" />

              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No " value="No" />
            
            </Picker>
          </View>
        </View>

        {/* Coaching place input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Where do you do practice</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={coachingplace}
              onValueChange={(itemValue) => setCoachingplace(itemValue)}
            >
              <Picker.Item label="Practice Details" value="" />

              <Picker.Item label="School" value="School" />
              <Picker.Item label="College" value="College" />
              <Picker.Item label="Academy" value="Academy" />
            
            </Picker>
          </View>
        </View>

        {/* Coaching interest input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Are you interested in further coaching?
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={coachingintrest}
              onValueChange={(itemValue) => setCoachingintrest(itemValue)}
            >
              <Picker.Item label="Coaching intrest" value="" />

              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
             
            
            </Picker>
          </View>
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
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    paddingHorizontal: 10, // Padding inside the picker to match input style
    backgroundColor: Colors.WHITE, // Same background as input
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    textAlign: "center",
  },
  inputContainer: { marginTop: 20 },
  label: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    width: "100%",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 40,
    marginTop: 50,
  },
  buttonText: { color: Colors.WHITE, textAlign: "center", fontSize: 17 },
});
