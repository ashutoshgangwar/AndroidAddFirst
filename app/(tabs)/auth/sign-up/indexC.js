import { API_URL } from '@env';
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
  const [expyear, setExpyear] = useState("");
  const [language, setLanguage] = useState("");
  const [expert, setExpert] = useState("");
  const [districts, setDistricts] = useState([]);

  const [gametype, setGametype] = useState("");
  const [game, setGame] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");

  const [password, setPassword] = useState("");


    // List of Indian languages
    const indianLanguages = [
      "Assamese",
      "Bengali",
      "Bodo",
      "Dogri",
      "Gujarati",
      "Hindi",
      "Kannada",
      "Kashmiri",
      "Konkani",
      "Maithili",
      "Malayalam",
      "Manipuri",
      "Marathi",
      "Nepali",
      "Odia",
      "Punjabi",
      "Sanskrit",
      "Santali",
      "Sindhi",
      "Tamil",
      "Telugu",
      "Urdu",
    ];
  
    // Experience years from 1 to 20
    const experienceYears = Array.from({ length: 20 }, (_, i) => i + 1);

  // State-to-district mapping
  const stateDistricts = {
    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kanshiram Nagar",
      "Kaushambi",
      "Kheri",
      "Kushinagar",
      "Lakhimpur Kheri",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Prayagraj",
      "Rae Bareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Nuh",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    // Add more states and districts here
  };

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

  // Update districts when the state is selected
  useEffect(() => {
    if (state) {
      setDistricts(stateDistricts[state] || []);
    } else {
      setDistricts([]); // Reset districts if no state is selected
    }
  }, [state]);

 // Correct mapping logic for Game based on Game Type
 useEffect(() => {
  if (gametype) {
    setGame(gamemapping[gametype] || []); // Use setGame to update the list of games
  } else {
    setGame([]); // Reset games if no game type is selected
  }
}, [gametype]);

const handleSubmit = async () => {

  // Validate the phone number
  const phoneNumberPattern = /^[0-9]{10}$/; // Regex to check for exactly 10 digits
  if (!phoneNumberPattern.test(phonenumber)) {
    Alert.alert("Error", "Contact number is invalid. It must be a 10-digit number.");
    return;
  }

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
    !language ||
    !expyear ||
    !expert ||
    !selectedGame ||
    !password
  ) {
    Alert.alert("Error", "Please fill out all fields");
    return;
  }

  try {
    // Check if the email exists
    const emailCheckResponse = await fetch(
      `${API_URL}/check-email?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const emailCheckData = await emailCheckResponse.json();

    if (emailCheckResponse.ok && emailCheckData.exists) {
      Alert.alert("Opps", "User already exist, Register with another Email id");
      return; // Stop the sign-up process if the email exists
    }

    
    // Signup API
    const response = await fetch(`${API_URL}/signup`, {
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
        game: selectedGame,
        language,
        expyear,
        expert,
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


   // Function to format date in DD-MM-YYYY
   const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth is 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setDob(formattedDate); // Set formatted date
    }
    setShowDatePicker(false); // Close the picker after selecting a date
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace("./../sign-in")}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Let's Sign Up</Text>
      <Text style={styles.headerTexttype}>As Coach/Trainer</Text>
      

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
            <Picker.Item label="School PTI" value="School PTI" />
          </Picker>
        </View>
      </View>

      {/* Experriane in */}
      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Specialization</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={expert}
            onValueChange={(itemValue) => setExpert(itemValue)}
          >
            <Picker.Item label="Select group" value="" />
            <Picker.Item label="Young" value="Young" />
            <Picker.Item label="Senior" value="Senior" />
            <Picker.Item label="University Level" value="University Level" />
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
              style={[styles.input, dob ? styles.selectedDateText : null]} // Apply bold style if a date is selected
              value={dob || ""} // Display the formatted date
              editable={false} // Prevent manual input
              placeholder="Select your DOB"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()} // Use current date as default
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gametype}
              onValueChange={(itemValue) => setGametype(itemValue)}
            >
              <Picker.Item label="Select Game Type" value="" />
              {Object.keys(gamemapping).map((gametype) => (
                <Picker.Item key={gametype} label={gametype} value={gametype} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedGame}
              onValueChange={(itemValue) => setSelectedGame(itemValue)} // Update selectedGame
            >
              <Picker.Item label="Select Game" value="" />
              {game.map((gameItem) => (
                <Picker.Item key={gameItem} label={gameItem} value={gameItem} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

       {/* Add Experience Year Picker */}
     <View style={styles.doubleFormGroup}>
     <View style={styles.halfWidth}>
        <Text style={styles.inputText}>Experience Year</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={expyear}
          onValueChange={(itemValue) => setExpyear(itemValue)}
        >
          <Picker.Item label="Select Experience Year" value="" />
          {experienceYears.map((year) => (
            <Picker.Item label={year.toString()} value={year.toString()} key={year} />
          ))}
        </Picker>
        </View>
      </View>

      {/* Add Language Picker */}
      <View style={styles.halfWidth}>
        <Text style={styles.inputText}>Preferred Language</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="Select Language" value="" />
          {indianLanguages.map((lang, idx) => (
            <Picker.Item label={lang} value={lang} key={idx} />
          ))}
        </Picker>
        </View>
      </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phonenumber}
          onChangeText={setPhonenumber}
          placeholder="+91xxxxxxx11"
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
    color: Colors.PRIMERY, // Make text bold when a date is selected
  },
});
