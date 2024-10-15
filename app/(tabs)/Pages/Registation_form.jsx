import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added import for AsyncStorage
import { Colors } from "../../../constants/Colors"; // Adjusted the import path for Colors

export default function ProfileDetails() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null); // Added error state
  const [loading, setLoading] = useState(true); // Added loading state
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found, please login again.");
      }

      const response = await fetch("http://192.168.0.101:6000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data.");
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>
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
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Player Weight</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Gender</Text>
          <Text style={styles.input}>{profileData?.gender}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Blood Group</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game</Text>
          <Text style={styles.input}>{profileData?.game}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Age Group</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Date</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Time</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>City</Text>
          <Text style={styles.input}>{profileData?.city}</Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Game Stage</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Contact Number</Text>
        <Text style={styles.input}>{profileData?.phonenumber}</Text>
      </View>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => router.push("./../(tab)/Games")}
      >
        <Text style={styles.detailsButtonText}>Update Details</Text>
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
  editButton: {
    alignSelf: "center",
    backgroundColor: Colors.PRIMARY, // Corrected spelling of PRIMERY to PRIMARY
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10, // To add space between the text and button
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
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
  updateButton: {
    alignItems: "center",
    backgroundColor: Colors.PRIMARY, // Corrected spelling of PRIMERY to PRIMARY
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
