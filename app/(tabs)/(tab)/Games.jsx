import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl, // Import RefreshControl
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../../constants/Colors";
import { useNavigation, useRouter } from "expo-router";

export default function Games() {
  const [games, setGames] = useState([]); // State to store fetched games
  const [refreshing, setRefreshing] = useState(false); // State for pull-down-to-refresh
  const navigation = useNavigation();
  const router = useRouter();

  // Fetch game details from the backend
  const fetchGameDetails = async () => {
    try {
      const response = await fetch("http://192.168.0.101:6000/gamedetail", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch game details");
      }

      const data = await response.json();
      setGames(data); // Set the fetched games data in state
    } catch (error) {
      console.error("Error fetching game details:", error.message);
    }
  };

  // Handle pull-down-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Start the refresh animation
    await fetchGameDetails(); // Re-fetch the data
    setRefreshing(false); // Stop the refresh animation
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchGameDetails(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to game zone</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } // Add RefreshControl to ScrollView
      >
        {games.map((game, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{game.gamename}</Text>
            </View>

            <Text style={styles.level}>Level: {game.gamelevel}</Text>
            <Image
              source={require("./../../../assets/images/game1.jpeg")} // Change this if you want dynamic images
              style={styles.icon}
            />

            {/* Age Group and Location in the same line */}
            <View style={styles.infoRow}>
              <Text style={styles.agegroup}>Age Group: {game.agegroup}</Text>
              <Text style={styles.venue}>Venue: {game.venue}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.agegroup}>Date: {game.date}</Text>
              <Text style={styles.time}>Time: {game.time}</Text>
            </View>

            <Text style={styles.description}>{game.details}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("./../Pages/Gameform")}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: "center",
                  fontSize: 17,
                }}
              >
                Enroll Now
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  venue: {
    fontSize: 15,
    fontWeight: "bold",
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
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
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 10,
    marginTop: 25,
  },
});
