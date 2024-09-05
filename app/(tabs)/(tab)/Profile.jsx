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

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
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
        <Image
          style={styles.avatar}
          source={require("./../../../assets/images/profile.png")}
        />
        <Text style={styles.name}>{profileData.fullname}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("")}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.accountInfo}>
        <Text style={styles.sectionTitle}>User Details:</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Mobile Number:</Text>
          <Text style={styles.infoValue}>{profileData.phonenumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email-id:</Text>
          <Text style={styles.infoValue}>{profileData.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>D.O.B:</Text>
          <Text style={styles.infoValue}>{profileData.DOB}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>City:</Text>
          <Text style={styles.infoValue}>{profileData.city}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{profileData.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game Type:</Text>
          <Text style={styles.infoValue}>{profileData.gametype}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game:</Text>
          <Text style={styles.infoValue}>{profileData.game}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game Stage:</Text>
          <Text style={styles.infoValue}>{profileData.gamestage}</Text>
        </View>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: Colors.WHITE,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
  accountInfo: {
    paddingHorizontal: 20,
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
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  logoutSection: {
    alignItems: "center",
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
