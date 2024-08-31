import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";


import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Journey() {

  const router = useRouter();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });


  return (
    <View
      style={{
        padding: 25,
        marginTop: 0,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          padding: 10,
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 15,
          textAlign: "center",
        }}
      >
        Welcome to Fitness World
      </Text>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={styles.iconRow}>
          <FontAwesome name="unlock" size={60} color="black" />
          <Text style={styles.iconText}>Unlock Your Potential</Text>
        </View>
        <Text style={styles.descriptionText}>
          Start your journey with a healthier you with personalized guidance.
        </Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={styles.iconRow}>
          <MaterialIcons name="sports-martial-arts" size={60} color="black" />
          <Text style={styles.iconText}>Tailored Nutrition & Fitness</Text>
        </View>
        <Text style={styles.descriptionText}>
          We create plans just for you, based on your goals and premises.
        </Text>
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={styles.iconRow}>
          <MaterialIcons name="data-exploration" size={50} color="black" />
          <Text style={styles.iconText}>Easy Data and Biggest Achievements</Text>
        </View>
        <Text style={styles.descriptionText}>
          Answer a few questions, and we'll do the rest for you. It's that simple.
        </Text>
      </View>

      <TouchableOpacity
          style={styles.button}
          
          onPress={() =>
            router.push("./../Pages/FirstForm")}
          
        >
          <Text
            style={{ color: Colors.WHITE, textAlign: "center", fontSize: 17 }}
          >
            Continue
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconText: {
    marginLeft: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionText: {
    padding: 1,
    fontSize: 18,
    textAlign: "center",
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 40,
    marginTop: 50,

  }
});
