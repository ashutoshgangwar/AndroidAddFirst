import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [initialImageUri, setInitialImageUri] = useState(null);
  const [imageUpdated, setImageUpdated] = useState(false);
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

      const response = await fetch("http://192.168.0.103:6000/profile", {
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
      const fetchedImageUri = data.profilePic
        ? `http://192.168.0.103:6000${data.profilePic}`
        : null;
      setImageUri(fetchedImageUri);
      setInitialImageUri(fetchedImageUri); // Set initial image URI
      setImageUpdated(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found, please login again.");
      }

      const formData = new FormData();
      if (imageUri && imageUri !== initialImageUri) {
        const fileName = imageUri.split("/").pop();
        const fileType = fileName.split(".").pop();
        console.log("Uploading image:", {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        });

        formData.append("profilePic", {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch("http://192.168.0.103:6000/profile/pic", {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile data.");
      }

      const data = await response.json();
      Alert.alert("Success", "Profile updated successfully!");
      setProfileData((prevData) => ({
        ...prevData,
        profilePic: data.profilePic,
      }));
      setInitialImageUri(imageUri); // Update initial image URI
      setImageUpdated(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Error",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Selected Image URI:", result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      setImageUpdated(false); // Reset image updated state when a new image is picked
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("auth/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Logout failed", "Something went wrong.");
    }
  };
   

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMERY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchProfileData} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          {imageUri || profileData?.profilePic ? (
            <Image
              source={{ uri: imageUri || profileData?.profilePic }}
              style={styles.profilePic}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={100}
              color={Colors.secondary}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{profileData?.fullname}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
        {imageUri !== initialImageUri && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.accountInfo}>
        <View>
          <Text style={styles.sectionTitle}>User Details:</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Mobile Number:</Text>
          <Text style={styles.infoValue}>{profileData?.phonenumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>D.O.B:</Text>
          <Text style={styles.infoValue}>{profileData?.dob}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>{profileData?.gender}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>City:</Text>
          <Text style={styles.infoValue}>{profileData?.city}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>State:</Text>
          <Text style={styles.infoValue}>{profileData?.state}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game Type:</Text>
          <Text style={styles.infoValue}>{profileData?.gametype}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game:</Text>
          <Text style={styles.infoValue}>{profileData?.game}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.MoreButton}   onPress={() => router.push("./../../(tabs)/Pages/Profile_details")}>
          <Text style={styles.detailsButtonText}>More Details</Text>
          <MaterialIcons
            name="expand-more"
            size={25}
            color="white"
            fontWeight="bold"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    backgroundColor: Colors.WHITE,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 24,
    color: Colors.PRIMERY,
    marginBottom: 10,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  backButton: {
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  accountInfo: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 16,
  },
  infoValue: {
    color: "#333",
    fontSize: 16,
  },
  logoutSection: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  MoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Aligns buttons to opposite ends
    alignItems: "center", // Align items vertically
    marginTop: 20, // Add margin if needed
  },
  detailsButton: {
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
