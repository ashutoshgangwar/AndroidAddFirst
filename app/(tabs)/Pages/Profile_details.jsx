import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter,  } from "expo-router";
import { Colors } from "./../../../constants/Colors";

export default function Profile_details() {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Hide the header when the component is mounted
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  })
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.headerText}>Your Profile Details</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Your Game</Text>
        <Text style={styles.input}></Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Game Age Group</Text>
        <Text style={styles.input}></Text>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Your Height</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Your Weight</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Your Level</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Best Performance</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.doubleFormGroup}>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Acedemy Name</Text>
          <Text style={styles.input}></Text>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.inputText}>Academy City</Text>
          <Text style={styles.input}></Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.inputText}>Coach Name</Text>
        <Text style={styles.input}></Text>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={() => router.push("./../(tab)/Games")}>
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
    textDecorationLine:"underline"
  },
  editButton: {
    alignSelf: "center",
    backgroundColor: Colors.PRIMERY,
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
