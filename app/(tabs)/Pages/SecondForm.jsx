import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";


import Fontisto from "@expo/vector-icons/Fontisto";
import Foundation from '@expo/vector-icons/Foundation';

export default function SecondForm() {
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
         <Foundation name="target-two" size={50} color="black" /> 
        Your Game Details (2).
       
      </Text>

      {/* Form Started */}

      {/* Player Weight */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Weight</Text>
          <TextInput style={style.input} placeholder="Your Weight" />
        </View>
      </View>

      {/* Player Height */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Height</Text>
          <TextInput style={style.input} placeholder="Your Height" />
        </View>
      </View>

      {/* Player Game Type */}
      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Game Type</Text>
          <TextInput style={style.input} placeholder="Enter your Prefrence (Indore/OutDoor)" />
        </View>
      </View>

      {/* Player Game */}

      <View>
        <View style={{ marginTop: 20 }}>
          <Text style={style.label}>Game</Text>
          <TextInput style={style.input} placeholder="Hockey/?/?" />
        </View>
      </View>


      <TouchableOpacity
          style={styles.button}
          
          onPress={() =>
            router.push("./../Pages/ThirdForm")}
          
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