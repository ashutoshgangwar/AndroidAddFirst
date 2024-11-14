import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.mainContainer}>
        <Image
          source={require("./../assets/images/logo.jpg")}
          style={styles.logo}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Game Started Now</Text>
          <Text style={styles.description}>
            The error stylesheet does not exist is occurring because you have
            referenced StyleSheet but haven't imported it. You need to import
            StyleSheet from react-native. Here's the corrected code
          </Text>
          </View>
          {/* Buttons in a row */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(tabs)/auth/sign-in")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(tabs)/auth/sign-up/role")}
            >
              <Text style={styles.buttonText}>Sign-Up</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ScrollView container to make the page scrollable
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },

  // Main container for the screen layout
  mainContainer: {
    height: '100%',
    backgroundColor: Colors.WHITE,
    alignItems: 'center', // Center the content
    justifyContent: 'center', // Center vertically
    paddingBottom: 40, // Add space at the bottom to prevent overlap with buttons
  },

  // Logo styling
  logo: {
    width: 350,
    height: 450,
    marginTop: -60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'contain', // Ensure the image scales properly
  },

  // Container for the text content
  container: {
    backgroundColor: Colors.WHITE,
    width: '90%',
    marginTop: -30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },

  // Title styling
  title: {
    fontSize: 22,
    textAlign: "center",
    color: Colors.PRIMERY,
    fontWeight: "bold",
    marginBottom: 10,
  },

  // Description text styling
  description: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.Black,
    marginBottom: 30,
    
 
    
  },

  // Container for the buttons
  buttonContainer: {
    flexDirection: "row", // Align buttons horizontally
    justifyContent: "space-between", // Spread out the buttons evenly
    width: '100%', // Ensure buttons take full width
  },

  // Button styling
  button: {
    flex: 1, // Make both buttons take equal space
    paddingVertical: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 20,
    marginHorizontal: 20, // Add spacing between buttons
    alignItems: 'center', // Center the text inside buttons
    justifyContent: 'center', // Center the text vertically
  },

  // Button text styling
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
});
