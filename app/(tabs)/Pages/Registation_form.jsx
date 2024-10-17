import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../constants/Colors";

export default function ProfileDetails() {
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { gamename, agegroup, date, time, formNumber } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId"); // Assume userId is stored in AsyncStorage

      if (!token || !userId) {
        throw new Error("No token or userId found, please login again.");
      }

      // Fetch profile data
      const profileResponse = await fetch("http://192.168.1.4:6000/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileResponse.ok) {
        throw new Error("Profile fetch error");
      }

      const profileData = await profileResponse.json();
      setProfileData(profileData);

      // Fetch user data
      const userResponse = await fetch("http://192.168.1.4:6000/userdata", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!userResponse.ok) {
        throw new Error("User fetch error");
      }

      const userData = await userResponse.json();
      setUserData(userData);

      // Check registration data
      const isRegistered = await checkRegistrationData(token, userId);
      if (isRegistered) {
        // Alert.alert("Notice", "You are already registered.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function checkRegistrationData(token, userId) {
    try {
      const response = await fetch(`http://192.168.1.4:6000/registrationform?userId=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.message !== "No registration forms found for this user"; // Data exists
      } else {
        throw new Error("Fetch error");
      }
    } catch (error) {
      // console.error("Error:", error);
      return false;
    }
  }
  const handleUpdateDetails = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
  
    if (!token || !userId) {
      return Alert.alert("Error", "No token or userId found, please login again.");
    }
  
    const isRegistered = await checkRegistrationData(token, userId);
    
    if (isRegistered) {
      // If the user is already registered, show the notice
      Alert.alert("Notice", "You are already registered.");
    } else {
      // If not registered, show the confirmation popup
      Alert.alert(
        "Confirm Submission",
        "Are you sure you want to submit your form?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: async () => {
              // Proceed to save data
              const registrationData = {
                applicationno: generateApplicationID(),
                fullname: profileData?.fullname,
                dob: profileData?.dob,
                height: userData?.height,
                weight: userData?.weight,
                gender: profileData?.gender,
                bloodgroup: userData?.bloodgroup,
                gamename,
                agegroup,
                date,
                time,
                formNumber,
                city: profileData?.city,
                gamelevel: userData?.gamelevel,
                phonenumber: profileData?.phonenumber,
                userId, // Ensure userId is passed in the registration form
              };
  
              try {
                const response = await fetch("http://192.168.1.4:6000/registrationform", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(registrationData),
                });
  
                const result = await response.json();
                if (response.ok) {
                  Alert.alert("Success", "Registration Successful. Application ID: " + registrationData.applicationno);
                  router.push("./../(tab)/Games");
                } else {
                  throw new Error(result.error || "Failed to update profile details.");
                }
              } catch (error) {
                Alert.alert("Error", error.message);
              }
            },
          },
        ]
      );
    }
  };
  
  const generateApplicationID = () => {
    const year = profileData?.dob.split('-')[2]; // Extract year from DOB
    const lastThreeDigits = formNumber.slice(-3); // Get the last 3 digits of formNumber
    const randomNumber = Math.floor(Math.random() * 1000); // Generate random number
    return `${gamename}${year}${lastThreeDigits}${randomNumber}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.headerText}>Your Profile Details</Text>
        <Text style={styles.headerTextEvent}>Event Id: {formNumber}</Text>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Player Name</Text>
          <Text style={styles.input}>{profileData?.fullname}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Date of Birth</Text>
          <Text style={styles.input}>{profileData?.dob}</Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Player Height</Text>
          <Text style={styles.input}>{userData?.height}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Player Weight</Text>
          <Text style={styles.input}>{userData?.weight}</Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Gender</Text>
          <Text style={styles.input}>{profileData?.gender}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Blood Group</Text>
          <Text style={styles.input}>{userData?.bloodgroup}</Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game</Text>
          <Text style={styles.input}>{gamename}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Age Group</Text>
          <Text style={styles.input}>{agegroup}</Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Date</Text>
          <Text style={styles.input}>{date}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Time</Text>
          <Text style={styles.input}>{time}</Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>City</Text>
          <Text style={styles.input}>{profileData?.city}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Player Stage</Text>
          <Text style={styles.input}>{userData?.gamelevel}</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Contact Number</Text>
        <Text style={styles.input}>{profileData?.phonenumber}</Text>
      </View>

      <View style={styles.formGroup}>
        <TouchableOpacity onPress={handleUpdateDetails} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    padding: 25,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  headerTextEvent: {
    fontSize: 20,
    padding: 10,
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
  inputText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 10,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 16,
  },
});
