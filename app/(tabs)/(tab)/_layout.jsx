import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { useNavigation, useRouter } from "expo-router";

// for profile icon
import FontAwesome from '@expo/vector-icons/FontAwesome';
// for journey and games
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
        name="Profile" 
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome 
              name="user-circle-o" 
              size={24} 
              color={focused ? 'black' : 'gray'} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'black' : 'gray', fontWeight: focused ? 'bold' : 'normal' }}>
              Profile
            </Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="Journey" 
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons 
              name="highway" 
              size={24} 
              color={focused ? 'black' : 'gray'} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'black' : 'gray', fontWeight: focused ? 'bold' : 'normal' }}>
              Journey
            </Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="Games" 
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons 
              name="biathlon" 
              size={24} 
              color={focused ? 'black' : 'gray'} 
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? 'black' : 'gray', fontWeight: focused ? 'bold' : 'normal' }}>
              Games
            </Text>
          ),
        }} 
      />
    </Tabs>
  );
}
