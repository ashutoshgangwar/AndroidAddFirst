import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [dob, setDob] = useState(null); // Initialize dob as null instead of empty string
  const [showDatePicker, setShowDatePicker] = useState(false); // Add state to control DatePicker visibility
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]); // Add state for districts
  const [gametype, setGametype] = useState("");
  const [game, setGame] = useState("");
  const [password, setPassword] = useState("");

   // State-to-district mapping
   const stateDistricts = {
    "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", 
    "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", 
    "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", 
    "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", 
    "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", 
    "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", 
    "Kanshiram Nagar", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", 
    "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", 
    "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Prayagraj", 
    "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", 
    "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", 
    "Unnao", "Varanasi"
  ],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
            "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", 
            "West Delhi"],
  "Haryana": [
    "Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", 
    "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", 
    "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
  ]
    // Add more states and districts here
  };

  // Update districts when the state is selected
  useEffect(() => {
    if (state) {
      setDistricts(stateDistricts[state] || []);
    } else {
      setDistricts([]); // Reset districts if no state is selected
    }
  }, [state]);

  const handleSubmit = async () => {
    if (
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
    setShowDatePicker(false); // Close the picker after selecting a date
    setDob(currentDate); // Update the DOB state with the selected date
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./../sign-in")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Let's Sign Up</Text>
      <Text style={styles.headerTexttype}>As Player</Text>
      <Text style={styles.subHeaderText}>Welcome to you</Text>

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
          <Text style={styles.inputText}>State</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
            >
              <Picker.Item label="Select State" value="" />
              {Object.keys(stateDistricts).map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>City/District</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => setCity(itemValue)}
            >
              <Picker.Item label="Select District" value="" />
              {districts.map((district) => (
                <Picker.Item key={district} label={district} value={district} />
              ))}
            </Picker>
          </View>
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
    flexGrow: 1, // Allow the ScrollView to expand
    justifyContent: "center", // Center content vertically
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
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 10,
  },
  inputText: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderColor: Colors.DIMMYGRAY,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: Colors.PRIMERY,
    padding: 20,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
  selectedDateText: {
    
    color: Colors.PRIMERY
  },
});
