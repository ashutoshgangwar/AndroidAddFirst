import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.PRIMERY,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 90,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom: 60,
  },
  optionCard: {
    width: '100%',
    backgroundColor: '#fff',
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
    width: '100%',
  },
  signUpButtonText: {
    color: Colors.PRIMERY,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginUser;
