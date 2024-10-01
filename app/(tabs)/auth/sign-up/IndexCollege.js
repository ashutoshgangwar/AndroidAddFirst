import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Colors } from "@/constants/Colors";

const IndexCollege = () => {
  // Define your state variables here

  const handleSubmit = async () => {
    // Handle sign-up logic for school/college
    Alert.alert('Success', 'School/College signed up successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sign Up as School/College</Text>
      {/* Add your form fields for the school/college role here */}
      <TextInput placeholder="Institution Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Phone Number" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: Colors.PRIMERY,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default IndexCollege;
