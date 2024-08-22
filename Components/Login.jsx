import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Login() {
  return (
    <View>
      <Image
        source={require("./../assets/images/logo.jpg")}
        style={{
          width: 400,
          height: 520,
          marginTop: -100,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <View style={styles.container}>
        <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10 }}>
          Shopping Here
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 10,
          }}
        >
          The error stylesheet does not exist is occurring because you have
          referenced StyleSheet but haven't imported it. You need to import
          StyleSheet from react-native. Here's the corrected code:
        </Text>
        <View style={styles.button}>
          <Text
            style={{ color: Colors.WHITE, textAlign: "center", fontSize: 17 }}
          >
            Sign In with Google
          </Text>
        </View>
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
