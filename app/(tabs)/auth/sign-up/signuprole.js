import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
 
} from "react-native";

import React, { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Start your Journey</Text>
      <Text style={styles.subtitle}>Welcome to you</Text>
      

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexP")}
        style={styles.createAccount}
      >
        <FontAwesome5 name="running" size={40} color="white" />
        <Text style={styles.createAccountText}>Sign Up As Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexC")}
        style={styles.createAccount}
      >
        <FontAwesome5 name="chalkboard-teacher" size={40} color="white" />
        <Text style={styles.createAccountText}>Sign Up As Coach</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexS")}
        style={styles.createAccount}
      >
        <FontAwesome5 name="school" size={40} color="white" />
        <Text style={styles.createAccountText}>Sign Up As School</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, backgroundColor: Colors.WHITE, height: "100%" },
  title: { fontSize: 30, padding: 25, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 25,
    padding: 5,
    color: Colors.GRAY,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  createAccount: {
    padding:30,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  createAccountText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
