import { Stack, Tabs } from 'expo-router';
import React from 'react';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown:false
      }}/>
    </Stack>
  );
}
