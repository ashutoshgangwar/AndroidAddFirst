import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from "expo-router";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";

const LoginUser = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const roles = [
    { title: 'Player', icon: 'sports-soccer' },
    { title: 'Coach', icon: 'person-outline' },
    { title: 'School/College', icon: 'school' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Sign up</Text>
          {roles.map((role) => (
            <RoleOption
              key={role.title}
              role={role}
              isSelected={selectedRole === role.title}
              onSelect={() => setSelectedRole(role.title)}
            />
          ))}
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const RoleOption = ({ role, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.optionCard, isSelected && styles.selectedCard]}
    onPress={onSelect}
  >
    <View style={styles.optionContent}>
      <Icon name={role.icon} size={40} color={isSelected ? '#007AFF' : '#000'} />
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionText}>Sign Up as</Text>
        <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>
          {role.title}
        </Text>
      </View>
    </View>
    {isSelected && <Icon name="check-circle" size={24} color="green" style={styles.checkIcon} />}
  </TouchableOpacity>
);

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
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 15,
    marginTop:20
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedText: {
    color: '#007AFF',
  },
  checkIcon: {
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
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

export default LoginUser;
