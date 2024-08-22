import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function SignIn() {
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
      }}

    >
      <Text style={{fontSize:30,
        marginTop: 20,
        padding:25
      }}>
        Let's Sign you In
      </Text>
    </View>
  );
}
