import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";


import Fontisto from "@expo/vector-icons/Fontisto";

export default function FirstForm() {
  const navigation = useNavigation();
  const router = useRouter();

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
        Welcome to Fitness
        <Fontisto name="world" size={60} color="black" /> World.
      </Text>

      {/* Form Started */}

      {/* Player Name */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Name</Text>
          <TextInput style={style.input} placeholder="Enter your Name" />
        </View>
      </View>

      {/* Player DOB */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Age</Text>
          <TextInput style={style.input} placeholder="Enter your Age" />
        </View>
      </View>

      {/* Player City */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>City</Text>
          <TextInput style={style.input} placeholder="Enter your City" />
        </View>
      </View>

      {/* Player State */}

      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>State</Text>
          <TextInput style={style.input} placeholder="Enter your State" />
        </View>
      </View>


      <TouchableOpacity
          style={styles.button}
          
          onPress={() =>
            router.push("./../Pages/SecondForm")}
          
        >
          <Text
            style={{ color: Colors.WHITE, textAlign: "center", fontSize: 17 }}
          >
            Next
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.DIMMYGRAY,
    marginTop: 5,
    width: "100%",
  },
});


const styles = StyleSheet.create({
    button: {
      padding: 15,
      backgroundColor: Colors.PRIMERY,
      borderRadius: 40,
      marginTop: 50,
  
    }
  });