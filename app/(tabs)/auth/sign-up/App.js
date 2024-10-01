import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpUser from "./signuprole"; // Ensure this matches the file name
import PlayerSignup from './IndexPlayer'; // Ensure this matches exactly
import IndexCoach from './IndexCoach'; // Ensure this matches exactly
import IndexCollege from './IndexCollege'; // Ensure this matches exactly

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="signuprole" component={SignUpUser} />
      <Stack.Screen name="IndexPlayer" component={PlayerSignup} />
      <Stack.Screen name="IndexCoach" component={IndexCoach} />
      <Stack.Screen name="IndexCollege" component={IndexCollege} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
