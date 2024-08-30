import { View, Text } from 'react-native'
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";

export default function Games() {
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
      height:'100%'
      
    }}>
      <Text>Games (Matches)</Text>
    </View>
  )
}