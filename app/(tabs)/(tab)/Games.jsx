import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useEffect } from "react";
import { Colors } from "./../../../constants/Colors";
import { useNavigation,useRouter } from "expo-router";

import Entypo from "@expo/vector-icons/Entypo";

export default function Games() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to game zone</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Hockey</Text>
            <TouchableOpacity onPress={() => router.push("./../Pages/Gameform")}>
              <Entypo name="circle-with-plus" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.level}>Level: School</Text>
          <Image
            source={require("./../../../assets/images/game1.jpeg")}
            style={styles.icon}
          />

          {/* Age Group and Location in the same line */}
          <View style={styles.infoRow}>
            <Text style={styles.agegroup}>Age Group: 20</Text>
            <Text style={styles.location}>Location: North Campus</Text>
          </View>

          <Text style={styles.description}>
            This is a brief description of the game. You can add more details
            like genre, rating, etc.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Track & Field</Text>
            <TouchableOpacity onPress={() => router.push("./../Pages/Gameform")}>
              <Entypo name="circle-with-plus" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.level}>Level: School</Text>
          <Image
            source={require("./../../../assets/images/game.jpeg")}
            style={styles.icon}
          />

          {/* Age Group and Location in the same line */}
          <View style={styles.infoRow}>
            <Text style={styles.agegroup}>Age Group: 14</Text>
            <Text style={styles.location}>Location: G D Goenka</Text>
          </View>

          <Text style={styles.description}>
            This is a brief description of the game. You can add more details
            like genre, rating, etc.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Chess</Text>
            <TouchableOpacity onPress={() => router.push("./../Pages/Gameform")}>
              <Entypo name="circle-with-plus" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.level}>Level: College</Text>
          <Image
            source={require("./../../../assets/images/game2.jpeg")}
            style={styles.icon}
          />

          {/* Age Group and Location in the same line */}
          <View style={styles.infoRow}>
            <Text style={styles.agegroup}>Age Group: 15</Text>
            <Text style={styles.location}>Location: South Campus</Text>
          </View>

          <Text style={styles.description}>
            This is a brief description of the game. You can add more details
            like genre, rating, etc.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: "row", // Puts items in a row
    alignItems: "center", // Vertically aligns them in the center
    justifyContent: "space-between", // Distributes space between the icon and the text
    paddingHorizontal: 60, // Adds some space on the left and right
    paddingVertical: 20, // Adds space on the top and bottom
    backgroundColor: Colors.WHITE,
  },

  headerText: {
    color: Colors.PRIMERY,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "90%",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row", // Align elements horizontally
    justifyContent: "space-between", // Space between title and icon
    alignItems: "center", // Align vertically in the center
    marginBottom: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  level: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  agegroup: {
    fontSize: 15,
    fontWeight: "bold",
  },
  location: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row", // Puts age group and location in a row
    justifyContent: "space-between", // Adds space between them
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: Colors.PRIMERY,
    marginTop: 10,
  },
  icon: {
    width: "100%",
    height: 100,
    marginTop: 5,
    borderRadius: 10,
  },
});
