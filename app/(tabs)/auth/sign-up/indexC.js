import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Button,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [registeras, setRegisteras] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dob, setDob] = useState(null); // Set initial date as current date
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle date picker
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gametype, setGametype] = useState("");
  const [game, setGame] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (
      !registeras ||
      !fullname ||
      !email ||
      !phonenumber ||
      !gender ||
      !dob ||
      !city ||
      !state ||
      !gametype ||
      !game ||
      !password
    ) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.101:6000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registeras,
          fullname,
          email,
          phonenumber,
          gender,
          dob,
          city,
          state,
          gametype,
          game,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Congratulations, you have Signed-Up");
        router.push("(tabs)/auth/sign-in");
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === "ios"); // Close the picker on Android after selection
    setDob(currentDate); // Update the DOB state
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./../sign-in")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Let's Sign Up</Text>
      <Text style={styles.headerTexttype}>As Coach/Trainer</Text>
      <Text style={styles.subHeaderText}>Welcome to you</Text>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Register As</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={registeras}
            onValueChange={(itemValue) => setRegisteras(itemValue)}
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Coach" value="Coach" />
            <Picker.Item label="Trainer" value="Trainer" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullname}
          onChangeText={setFullname}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
        />
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={[
                styles.input,
                dob ? styles.selectedDateText : null, // Apply bold style if a date is selected
              ]}
              value={dob ? dob.toLocaleDateString() : ""} // Ensure dob is a valid Date before calling toLocaleDateString
              editable={false} // Prevent manual input
              placeholder="Select your DOB"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob || new Date()} // Use current date as fallback if dob is null
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()} // Prevent selecting future dates
            />
          )}
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>State</Text>
          <TextInput
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholder="Enter your State"
          />
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game Type</Text>
          <TextInput
            style={styles.input}
            value={gametype}
            onChangeText={setGametype}
            placeholder="Game Type"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game</Text>
          <TextInput
            style={styles.input}
            value={game}
            onChangeText={setGame}
            placeholder="Enter your Game"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phonenumber}
          onChangeText={setPhonenumber}
          placeholder="Enter your Contact Number"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your Password"
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerTexttype: {
    fontSize: 30,
    padding: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 25,
    padding: 5,
    color: Colors.GRAY,
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  formGroup: {
    marginTop: 20,
  },
  doubleFormGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  halfWidth: {
    width: "48%",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMERY,
    marginTop: 10,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: Colors.PRIMERY,
    padding: 15,
    borderRadius: 20,
    marginTop: 25,
  },
  submitButtonText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.PRIMERY,
    borderRadius: 15,
    marginTop: 10,
  },
  selectedDateText: {
  
    color: Colors.PRIMERY // Make text bold when a date is selected
  },
});
