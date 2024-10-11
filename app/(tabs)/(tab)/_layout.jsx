import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { useNavigation, useRouter } from "expo-router";

// for profile icon
import FontAwesome from '@expo/vector-icons/FontAwesome';
// for journey and games


import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Tabs>
      <Tabs.Screen 
        name="Home" 
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'black' : 'gray', fontWeight: focused ? 'bold' : 'normal' }}>
              Home
            </Text>
          ),
        }} 
      />     
      <Tabs.Screen 
        name="Games" 
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="gamepad" size={24} color="black" />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'black' : 'gray', fontWeight: focused ? 'bold' : 'normal' }}>
              Game
            </Text>
          ),
        }} 
      />
    </Tabs>
  );
}
