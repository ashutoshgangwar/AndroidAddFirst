import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";


import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Journey() {
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
          padding: 25,
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 30,
          textAlign: "center",
        }}
      >
        Welcome to Fitness World
      </Text>

      <View>
        <Text
          style={{
            padding: 10,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
            textAlign: "center",
            alignContent: 'space-around'
          }}
        >
          <FontAwesome name="unlock" size={60} color="black" />
         
          Unlock Your Potencial
        </Text>
        <Text
          style={{
            padding: 1,
            fontSize: 18,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Start your journey with healthier you with personalized guidance
        </Text>
      </View>

      <View>
        <Text
          style={{
            padding: 10,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Tailored, Nutrition & Fitness
        </Text>

        <Text
          style={{
            padding: 1,
            fontSize: 18,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          We Create Plan Just for you, based on your goles and premisess.
        </Text>
      </View>

      <View>
        <Text
          style={{
            padding: 10,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Easy data and bigest achievment.
        </Text>

        <Text
          style={{
            padding: 1,
            fontSize: 18,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Answer a few questions, and we'll do the rest for you, it's that
          simple.
        </Text>
      </View>
    </View>
  );
}

