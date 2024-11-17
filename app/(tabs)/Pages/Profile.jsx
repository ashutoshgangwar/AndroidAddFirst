import { API_URL } from "@env";
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
  TextInput,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(""); // Define bio state
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

      const response = await fetch(`${API_URL}/profile`, {
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
        ? `${API_URL}${data.profilePic}`
        : null;
      setImageUri(fetchedImageUri);
      setInitialImageUri(fetchedImageUri); // Set initial image URI
      setImageUpdated(false);
      setBio(data.bio || ""); // Make sure the bio state is set from the profile data
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

      const response = await fetch(`${API_URL}/profile/pic`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Success", "Bio updated successfully!");
        setIsEditingBio(false);
        setBio(bio); // Make sure the bio state is updated with the new bio
      } else {
        console.error("API request failed with status:", response.status);
        console.log("Response Text:", responseData);
        throw new Error(
          `Failed to update bio. Status code: ${response.status}`
        );
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

  const handleSaveBio = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found, please login again.");
      }

      console.log("Saving Bio:", bio); // Debugging line

      const response = await fetch(`${API_URL}/profile/bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio: bio }), // Ensure correct payload
      });

      const responseData = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", responseData);
      if (response.ok) {
        Alert.alert("Success", "Bio updated successfully!");
        setIsEditingBio(false);
        setProfileData((prevData) => ({
          ...prevData,
          bio: bio, // Update local state
        }));
      } else {
        throw new Error(`Failed to update bio. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving bio:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("isDataFilled");
      router.replace("auth/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.replace("./../(tab)/Home")}
          style={styles.backButtonWrapper} // Add this style
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.profiletext}>Profile</Text>
      </View>
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
        {imageUri !== initialImageUri && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.name}>({profileData?.fullname})</Text>
        <Text style={styles.email}>{profileData?.email}</Text>
        <View style={styles.formGroup}>
          <Text style={styles.inputText}>About Me</Text>
          <View style={styles.bioContainer}>
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={styles.bioScroll}
            >
              {isEditingBio ? (
                <TextInput
                  style={styles.bioText}
                  value={bio} // Bind the bio state here
                  onChangeText={setBio} // Update the bio state when text changes
                  multiline
                  numberOfLines={4}
                />
              ) : (
                <Text style={styles.bioText}>{bio}</Text> // Display the bio when not editing
              )}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={isEditingBio ? handleSaveBio : () => setIsEditingBio(true)}
          >
            <Text style={styles.saveButtonText}>
              {isEditingBio ? "Save Bio" : "Edit Bio"}
            </Text>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={styles.MoreButton}
          onPress={() => router.push("./../../(tabs)/Pages/Profile_details")}
        >
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
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between", // Ensure proper spacing
    marginBottom: 10,
    paddingHorizontal: 5,
    marginLeft: -24,
  },
  backButtonWrapper: {
    padding: 1, // Add padding to make it easier to tap
  },
  profiletext: {
    fontSize: 25,
    color: Colors.PRIMERY,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Allows text to take up remaining space
  },
  menuIcon: {
    marginLeft: -20, // Adds space between the icon and the text
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },

  formGroup: {
    marginTop: 1,
  },

  input: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.PRIMERY,
    marginTop: 5,
    height: 60,
    width: 350,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    color: Colors.PRIMERY,
    marginBottom: 10,
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },
  email: {
    fontSize: 15,
    color: Colors.GRAY,
    marginBottom: 10,
    // fontWeight: "bold",
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

  bioContainer: {
    height: 100, // Fixed height for bio container
    width: 350, // Fixed width for bio container
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMERY,
    borderRadius: 5,
    padding: 5,
  },
  bioScroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  bioText: {
    fontSize: 16,
    color: Colors.BLACK,
    lineHeight: 22,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    height: 40,
    width: 100,
    backgroundColor: Colors.PRIMERY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  accountInfo: {
    paddingHorizontal: 20,
    marginTop: 5,
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
