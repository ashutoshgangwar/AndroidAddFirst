import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "./../../../constants/Colors"; // Ensure this path is correct
import { useNavigation, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker"; // For picking date and time
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddEvent() {
  const [gametype, setGametype] = useState(""); // State for game type
  const [gamename, setGameName] = useState(""); // Single selected game name
  const [gamelevel, setGameLevel] = useState("");
  const [agegroup, setAgeGroup] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formNumber, setFormNumber] = useState("");
  const navigation = useNavigation();
  const router = useRouter();

  // Game Type and Game Mapping
  const gamemapping = {
    Indoor_Games: [
      "Badminton",
      "Basketball (3x3)",
      "Boxing",
      "Fencing",
      "Gymnastics",
      "Judo",
      "Karate",
      "Table Tennis",
      "Taekwondo",
      "Volleyball (Indoor)",
      "Weightlifting",
      "Wrestling",
      "Rhythmic Gymnastics",
      "Trampoline",
      "Shooting",
      "Handball (Indoor)",
      "Wrestling (Greco-Roman & Freestyle)",
    ],
    Outdoor_Games: [
      "Athletics (Track and Field)",
      "Archery",
      "Beach Volleyball",
      "Canoeing",
      "Cycling (Road, Mountain Bike, BMX)",
      "Equestrian",
      "Football (Soccer)",
      "Golf",
      "Hockey",
      "Rugby Sevens",
      "Sailing",
      "Skateboarding",
      "Surfing",
      "Swimming",
      "Tennis",
      "Triathlon",
      "Water Polo",
      "Rowing",
      "Diving",
      "Marathon Swimming",
      "Synchronized Swimming",
      "Modern Pentathlon",
    ],
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const generateFormNumber = () => {
    // Generate a random form number using a combination of the current date and a random number
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    
    // Get the current date
    const currentDate = new Date();
    
    // Format the date as YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    // Create the formatted timestamp
    const formattedDate = `${year}${month}${day}`;
    
    // Return the form number
    return `${formattedDate}-${randomNumber}`;
  };
  

  const handleSave = async () => {
    // Validate fields
    if (
      !gametype ||
      !gamename ||
      !gamelevel ||
      !agegroup ||
      !venue ||
      !details ||
      !imageUrl
    ) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      const formattedTime = time.toTimeString().split(" ")[0]; // Format time to HH:MM:SS
      const formNumber = generateFormNumber(); 

      const newGame = {
        formNumber,
        gametype,
        gamename,
        gamelevel,
        agegroup: parseInt(agegroup, 10) || 0, // Provide a fallback
        venue,
        date: formattedDate,
        time: formattedTime,
        details,
        imageUrl,
      };

      // Debugging logs
      console.log("New Game Data:", newGame); // Debug log
      const token = await AsyncStorage.getItem("userToken");
      console.log("User Token:", token); // Debug log

      const response = await fetch("http://192.168.0.101:6000/addgame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(newGame),
      });

      const responseData = await response.json();
      console.log("Response data:", responseData); // Inspect the response

      if (response.ok) {
        // Alert.alert("Success", "Game added successfully");
        Alert.alert("Success", `Game added successfully with Form No: ${formNumber}`)

        router.push("./../(tab)/Home");
        // Clear the form
        setFormNumber("");
        setGametype("");
        setGameName("");
        setGameLevel("");
        setAgeGroup("");
        setVenue("");
        setDate(new Date());
        setTime(new Date());
        setDetails("");
        setImageUrl("");
      } else {
        throw new Error(responseData?.message || "Failed to save the game");
      }
    } catch (error) {
      console.error("Error details:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to save the game. Try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Event</Text>

      {/* Game Type Picker */}
<View style={styles.formGroup}>
  <Text style={styles.label}>Game Type</Text>
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={gametype}
      style={styles.input} // Keeping your existing styles
      onValueChange={(itemValue) => {
        setGametype(itemValue);
        setGameName(""); // Reset the game name when game type changes
      }}
    >
      <Picker.Item label="Select Game Type" value="" />
      <Picker.Item label="Indoor Games" value="Indoor_Games" />
      <Picker.Item label="Outdoor Games" value="Outdoor_Games" />
    </Picker>
  </View>
</View>

{/* Game Name Picker */}
<View style={styles.formGroup}>
  <Text style={styles.label}>Game Name</Text>
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={gamename}
      style={styles.input} // Keeping your existing styles
      onValueChange={(itemValue) => setGameName(itemValue)}
      enabled={gametype !== ""} // Enable only if a game type is selected
    >
      <Picker.Item label="Select Game Name" value="" />
      {gametype && gamemapping[gametype]?.length > 0 ? (
        gamemapping[gametype].map((game, index) => (
          <Picker.Item key={index} label={game} value={game} />
        ))
      ) : (
        <Picker.Item label="No games available" value="" />
      )}
    </Picker>
  </View>
</View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Game Level</Text>
        <TextInput
          style={styles.input}
          value={gamelevel}
          onChangeText={setGameLevel}
          placeholder="Enter game level"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age Group</Text>
        <TextInput
          style={styles.input}
          value={agegroup}
          onChangeText={setAgeGroup}
          keyboardType="numeric" // Ensure it's a number input
          placeholder="Enter age group"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Venue</Text>
        <TextInput
          style={styles.input}
          value={venue}
          onChangeText={setVenue}
          placeholder="Enter venue"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Enter image URL"
        />
      </View>

      {/* Date picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.input}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
      </View>

      {/* Time picker */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Time</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.input}>{time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Details</Text>
        <TextInput
          style={styles.input}
          value={details}
          onChangeText={setDetails}
          placeholder="Enter event details"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    borderColor: Colors.GRAY, // Border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Optional: for rounded corners
    overflow: 'hidden', // Ensure corners are rounded
  },
  formGroup: {
    marginBottom: 15,
    
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.PRIMERY,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 16,
  },
});
