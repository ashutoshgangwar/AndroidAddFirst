import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Gameform() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (name === '' || age === '' || location === '') {
      Alert.alert('Error', 'Please fill all fields');
    } else {
      Alert.alert('Success', `User Name: ${name}, Age: ${age}, Location: ${location}`);
      // Reset form (optional)
      setName('');
      setAge('');
      setLocation('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Details Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
