import { View, Text } from 'react-native'
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";

export default function RegistationForm() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      });
  return (
    <View>
      <Text>Welcome to my Page</Text>
    </View>
  )
}