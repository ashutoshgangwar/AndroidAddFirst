import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={{height:'100%',
      marginTop:200,
      backgroundColor: Colors.WHITE
    }}>
      <Image
        source={require("./../assets/images/logo1.jpeg")}
        style={{
          width: 400,
          height: 520,
          marginTop: -100,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10, fontWeight:"bold" }}>
          Game Started
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 10,
            height:'100%'
          
          }}
        >
          The error stylesheet does not exist is occurring because you have
          referenced StyleSheet but haven't imported it. You need to import
          StyleSheet from react-native. Here's the corrected code
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/sign-in")}
        >
          <Text
            style={{ color: Colors.WHITE, textAlign: "center", fontSize: 17 }}
          >
            Start your Journey
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundcolor: Colors.PRIMERY,
    marginTop: 10,
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 99,
    marginTop: 25,
    
  },
});
