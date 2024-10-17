import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";

const RegistrationSuccess = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Success icon */}
        <Image
          source={require("./../../../assets/images/success.png")} // You can use a custom checkmark icon here
          style={styles.icon}
        />

        {/* Success message */}
        <Text style={styles.successText}>Congratulations!!</Text>
        <Text style={styles.descriptionText}>
          Your have already submitted your details.
        </Text>

        {/* OK button */}
        <TouchableOpacity style={styles.okButton} onPress={() => router.replace("./../(tab)/Games")}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: 350,
    padding: 50,
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  successText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.PRIMERY,
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: Colors.PRIMERY,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: "black",
  },
  okButton: {
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  okButtonText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegistrationSuccess;
