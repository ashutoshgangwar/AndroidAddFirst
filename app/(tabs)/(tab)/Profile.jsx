import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Colors } from "../../../constants/Colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Import the icon

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("./../../../assets/images/profile.png")} // Replace with your image URL
        />
        <Text style={styles.username}>@ashutosh</Text>
        <Text style={styles.email}>ashu@games.com</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("")}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.accountInfo}>
        <Text style={styles.sectionTitle}>Account Details</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>Ashutosh Gangwar</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Mobile Number:</Text>
          <Text style={styles.infoValue}>+91-8368300788</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email-id:</Text>
          <Text style={styles.infoValue}>ashutosh@games.com</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>D.O.B:</Text>
          <Text style={styles.infoValue}>02-05-1994</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>Mayur Vihar Ph-1</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>City:</Text>
          <Text style={styles.infoValue}>Mayur Vihar</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>Delhi</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game Type:</Text>
          <Text style={styles.infoValue}>Indore/Outdoor</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game:</Text>
          <Text style={styles.infoValue}>Hockey</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Game Stage:</Text>
          <Text style={styles.infoValue}>State Level</Text>
        </View>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("auth/sign-in")}
        >
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
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
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
    fontSize: 18,
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
});