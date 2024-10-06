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
import Foundation from "@expo/vector-icons/Foundation";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SecondForm() {
  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigation = useNavigation();
  const router = useRouter();
  const [agegroup, setAgegroup] = useState(""); // State for age group
  const [gamelevel, setGamelevel] = useState(""); // State for game level
  const [performance, setPerformance] = useState(""); // State for best performance

  // Validate inputs
  const validateForm = () => {
    if (!agegroup || !gamelevel || !performance) {
      Alert.alert("Error", "Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await AsyncStorage.setItem(
        "gameDetails",
        JSON.stringify({ agegroup, gamelevel, performance })
      );
      router.push("(tabs)/Pages/ThirdForm");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  // Create an array for age group options (12 to 35 Year)
  const ageOptions = [];
  for (let i = 12; i <= 35; i++) {
    ageOptions.push(<Picker.Item key={i} label={`${i} Year`} value={`${i}`} />);
  }


  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // Create an array for the Performance year picker (1990 to current year)
  const yearOptions = [];
  for (let i = 1990; i <= currentYear; i++) {
    yearOptions.push(
      <Picker.Item key={i} label={`${i}`} value={`${i}`} />
    );
  }



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./FirstForm")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>
          <Foundation name="target-two" size={50} color="black" />
          Your game details (2).
        </Text>

        {/* Age group input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game Under Age Group</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={agegroup}
              onValueChange={(itemValue) => setAgegroup(itemValue)}
            >
              <Picker.Item label="Select Age Group" value="" />
              {Array.from({ length: 24 }, (_, i) => i + 12).map((value) => (
                <Picker.Item
                  key={value}
                  label={`${value} Year`}
                  value={value.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Game level input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Game Level</Text>
          <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={gamelevel}
            onValueChange={(itemValue) => setGamelevel(itemValue)}
          >
            <Picker.Item label="Select Game Level" value="" />

            <Picker.Item label="School" value="School" />
            <Picker.Item label="College" value="College" />
            <Picker.Item label="District" value="District" />
            <Picker.Item label="State" value="State" />
            <Picker.Item label="National" value="National" />
           
          </Picker>
          </View>
        </View>

        {/* Best performance input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Best Performance Year</Text>
          <View style={styles.pickerWrapper}>
          <Picker
              selectedValue={performance}
              onValueChange={(itemValue) => setPerformance(itemValue)}
            >
              <Picker.Item label="Select Year" value="" />
              {yearOptions}
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
  container: { flex: 1, backgroundColor: Colors.WHITE, padding: 25 },
  contentContainer: { marginTop: 50, paddingBottom: 50 },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    textAlign: "center",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    paddingHorizontal: 10, // Padding inside the picker to match input style
    backgroundColor: Colors.WHITE, // Same background as input
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
