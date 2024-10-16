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
  const [instname, setInstname] = useState("");
  const [address, setAddress] = useState("");
 
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [email, setEmail] = useState("");
  const [headname, setHeadname] = useState("");
  const [headphone, setHeadphone] = useState("");
  const [ptteachername, setPteachername] = useState("");
  const [ptteacherphone, setPtteacherphone] = useState("");
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
  // Validate the phone numbers
  const phoneNumberPattern = /^[0-9]{10}$/; // Regex to check for exactly 10 digits

  // Check headphone number
  if (!phoneNumberPattern.test(headphone)) {
    Alert.alert("Error", "Principal contact number is invalid. It must be a 10-digit number.");
    return;
  }

  // Check ptteacherphone number
  if (!phoneNumberPattern.test(ptteacherphone)) {
    Alert.alert("Error", "PT Teacher contact number is invalid. It must be a 10-digit number.");
    return;
  }

  if (
    !registeras ||
    !instname ||
    !address ||
    !city ||
    !state ||
    !email ||
    !headname ||
    !headphone ||
    !ptteachername ||
    !ptteacherphone ||
    !password
  ) {
    Alert.alert("Error", "Please fill out all fields");
    return;
  }

  try {
    // Check if the email exists
    const emailCheckResponse = await fetch(
      `http://192.168.1.4:6000/check-email?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const emailCheckData = await emailCheckResponse.json();

    if (emailCheckResponse.ok && emailCheckData.exists) {
      Alert.alert("Opps", "User already exists, Register with another Email id");
      return; // Stop the sign-up process if the email exists
    }

    // Signup API
    const response = await fetch("http://192.168.1.4:6000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registeras,
        instname,
        address,
        email,
        headname,
        headphone,
        ptteachername,
        ptteacherphone,
        city,
        state,
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./../sign-in")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Let's Sign Up</Text>
      <Text style={styles.headerTexttype}>As School/College</Text>
      <Text style={styles.subHeaderText}>Welcome to you</Text>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Register As</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={registeras}
            onValueChange={(itemValue) => setRegisteras(itemValue)}
          >
            <Picker.Item label="Select Role" value="" />

            <Picker.Item label="School" value="School" />
            <Picker.Item label="College" value="College" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>College or School Name</Text>
        <TextInput
          style={styles.input}
          value={instname}
          onChangeText={setInstname}
          placeholder="Enter your College/School Name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>College/School Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Full address"
        />
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

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Enter Principal Email Id</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Please enter email id"
        />
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Principal Name</Text>
          <TextInput
            style={styles.input}
            value={headname}
            onChangeText={setHeadname}
            placeholder="Principal Name"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Contact Details</Text>
          <TextInput
            style={styles.input}
            value={headphone}
            onChangeText={setHeadphone}
            placeholder="+91xxxxxxx11"
          />
        </View>
      </View>
      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>PT Teacher Name</Text>
          <TextInput
            style={styles.input}
            value={ptteachername}
            onChangeText={setPteachername}
            placeholder="PT Teacher Name"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Contact Details</Text>
          <TextInput
            style={styles.input}
            value={ptteacherphone}
            onChangeText={setPtteacherphone}
            placeholder="+91xxxxxxx11"
          />
        </View>
      </View>

      {/* Edited */}

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
    backgroundColor: Colors.WHITE, // Ensures the picker has a white background
    paddingLeft: 10, // Padding for better readability
  },
  selectedDateText: {
    color: Colors.PRIMERY,
  },
});
