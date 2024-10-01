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

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Let's Sign you Up</Text>
      <Text style={styles.subHeaderText}>Welcome to you</Text>


      <TouchableOpacity  onPress={() => router.replace("./indexP")} style={styles.submitButton}>
      <Ionicons name="football-outline" size={50} color="white" />
        <Text style={styles.submitButtonText}>Sign Up As Player</Text>
       
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => router.replace("./../sign-up/indexC")} style={styles.submitButton}>
        <FontAwesome5 name="chalkboard-teacher" size={50} color="white" />
        <Text style={styles.submitButtonText}>Sign Up As Coach</Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => router.replace("./../sign-up/indexS")} style={styles.submitButton}>
        <MaterialCommunityIcons name="school-outline" size={50} color="white" />
        <Text style={styles.submitButtonText}>Sign Up As School/College</Text>
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
    padding: 25,
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
  submitButton: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',  // Center items vertically
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  submitButtonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10, // Space between icon and text
  },
});
