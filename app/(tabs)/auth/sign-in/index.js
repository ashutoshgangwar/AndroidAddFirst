import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../../constants/Colors";

export default function SignIn() {
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
      height: '100%',
    }}
  >
    <Text
      style={{
        fontSize: 30,
        padding: 25,
        fontWeight:"bold",
         textAlign:"center"

      }}
    >
      Let's Sign you In
    </Text>

    <Text
      style={{
        fontSize: 25,
        padding: 5,
        color: Colors.GRAY,
        marginLeft: 20,
        marginTop: 10,
        fontWeight:'bold',
        textAlign:"center",
        textDecorationLine:"underline"
      }}
    >
      Welcome to you
    </Text>


      {/* Email Address */}
      <View style={{ marginTop: 20, marginTop: 50 }}>
        <Text> Email </Text>

        <TextInput style={style.input} placeholder="Enter your email address" />
      </View>

      {/* Password */}

      <View style={{ marginTop: 20 }}>
        <Text> Password</Text>

        <TextInput
          secureTextEntry={true}
          style={style.input}
          placeholder="Enter your Password"
        />
      </View>

      {/* SignIn Button */}

      <TouchableOpacity
      onPress={() => router.replace("(tabs)/Journey")}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMERY,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Create Account */}

      <TouchableOpacity
        onPress={() => router.replace("auth/sign-up")}
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontSize: 20,
            fontWeight:"bold",
        
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderBlockColor: Colors.DIMMYGRAY,
    marginTop: 20,
  },
});
