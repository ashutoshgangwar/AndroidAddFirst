import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
   <Tabs>
    <Tabs.Screen name ="Profile"/>
    <Tabs.Screen name ="Journey"/>
    <Tabs.Screen name ="RegistationFrom"/>
   </Tabs>
  )
}