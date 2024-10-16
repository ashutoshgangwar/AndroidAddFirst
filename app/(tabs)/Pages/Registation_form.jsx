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
      if (!token) {
        throw new Error("No token found, please login again.");
      }

      const [profileResponse, userResponse] = await Promise.all([
        fetch("http://192.168.1.4:6000/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://192.168.1.4:6000/userdata", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!profileResponse.ok || !userResponse.ok) {
        const errorMessage = `Profile: ${profileResponse.statusText}, User: ${userResponse.statusText}`;
        throw new Error(errorMessage || "Failed to fetch data.");
      }

      const profileData = await profileResponse.json();
      const userData = await userResponse.json();

      setProfileData(profileData);
      setUserData(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDetails = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      Alert.alert("Error", "No token found, please login again.");
      return;
    }

    const registrationData = {
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
        Alert.alert("Success", "Regstation Succesfull");
        router.push("./../(tab)/Games"); // Navigate to Games screen
      } else {
        throw new Error(result.error || "Failed to update profile details.");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
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
        {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity> */}
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

      {/* Game, Age Group, Date, and Time from useSearchParams */}
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

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateDetails}>
        <Text style={styles.detailsButtonText}>Submit Details</Text>
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
    padding: 25,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  headerTextEvent:{
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",

  },
  // editButton: {
  //   alignSelf: "center",
  //   backgroundColor: Colors.PRIMERY,
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  //   marginTop: 10,
  // },
  // editButtonText: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
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
  updateButton: {
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
