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
      {/* <Text style={styles.subtitle}>Welcome to you</Text> */}
      

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexP")}
        style={styles.createAccount}
      >
        <Text style={styles.signup}>Sign Up</Text>
        <FontAwesome5 name="running" size={50} color="white" />
        <Text style={styles.createAccountText}>As Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexC")}
        style={styles.createAccount}
      >
          <Text style={styles.signup}>Sign Up</Text>
        <FontAwesome5 name="chalkboard-teacher" size={50} color="white" />
        <Text style={styles.createAccountText}>Coach/Trainer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("./../sign-up/indexS")}
        style={styles.createAccount}
      >
        <Text style={styles.signup}>Sign Up</Text>
        <FontAwesome5 name="school" size={50} color="white" />
        <Text style={styles.createAccountText}>As School/College</Text>
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
    padding:20,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    alignItems: "center",
  },
  createAccountText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop:10
  },

  signup: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom:10
  },
});
