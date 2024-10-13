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
  import AsyncStorage from '@react-native-async-storage/async-storage';

  
  export default function AddEvent() {
    const [gamename, setGameName] = useState("");
    const [gamelevel, setGameLevel] = useState("");
    const [agegroup, setAgeGroup] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [details, setDetails] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const navigation = useNavigation();
    const router = useRouter();
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation]);
  
    const handleSave = async () => {
        if (!gamename || !gamelevel || !agegroup || !venue || !details || !imageUrl) {
          Alert.alert("Error", "Please fill in all the fields");
          return;
        }
      
        try {
          const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
          const formattedTime = time.toTimeString().split(" ")[0]; // Format time to HH:MM:SS
      
          const newGame = {
            gamename,
            gamelevel,
            agegroup: parseInt(agegroup),
            venue,
            date: formattedDate,
            time: formattedTime,
            details,
            imageUrl,
          };
      
          // Retrieve the token (this is an example; adjust it based on where you're storing the token)
          const token = await AsyncStorage.getItem('userToken'); // Assuming you're using AsyncStorage
      
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
            Alert.alert("Success", "Game added successfully");
            router.push("./../(tab)/Home");
            // Clear the form
            setGameName("");
            setGameLevel("");
            setAgeGroup("");
            setVenue("");
            setDate(new Date());
            setTime(new Date());
            setDetails("");
            setImageUrl("");
          } else {
            throw new Error(responseData.message || "Failed to save the game");
          }
        } catch (error) {
          console.error("Error details:", error);
          Alert.alert("Error", error.message || "Failed to save the game. Try again.");
        }
      };
      
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Add Event</Text>
  
        <View style={styles.formGroup}>
          <Text style={styles.label}>Game Name</Text>
          <TextInput
            style={styles.input}
            value={gamename}
            onChangeText={setGameName}
            placeholder="Enter game name"
          />
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
      color: Colors.PRIMERY,
      marginBottom: 30,
      textAlign: "center",
      marginTop: 25,
    },
    formGroup: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.PRIMERY,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.PRIMERY,
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
    },
    button: {
      backgroundColor: Colors.PRIMERY,
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: Colors.WHITE,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  