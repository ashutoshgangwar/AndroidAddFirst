import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../../constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';

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
      // console.log("Fetched data:", data); // Log the fetched data
      setGames(data); // Set the fetched games data in state
    } catch (error) {
      // Log error to console; do not set any UI state or message
      // console.error("Error fetching game details:", error.message);
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
        <TouchableOpacity onPress={() => router.push("./../Pages/Addevent")}>
          <Ionicons name="add-circle" size={35} color="black" marginTop={10} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {games.length === 0 ? ( // Check if the games array is empty
          <View style={styles.noEventsContainer}>
            <AntDesign name="closecircle" size={80} color="black" marginBottom={20} />
            <Text style={styles.noEventsText}>No events are available</Text>
          </View>
        ) : (
          games.map((game, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>{game.gamename}</Text>
              </View>

              <Text style={styles.level}>Level: {game.gamelevel}</Text>
              <Image
                source={{ uri: game.imageUrl }} // Ensure image URL is correct
                style={styles.icon}
              />

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
  onPress={() => {
    // Pass selected game details via route params
    router.push({
      pathname: './../Pages/Registation_form',
      params: {
        gamename: game.gamename,
        agegroup: game.agegroup,
        date: game.date,
        time: game.time,
      },
    });
  }}
>
  <Text style={{ color: Colors.WHITE, textAlign: "center", fontSize: 17 }}>
    Enroll Now
  </Text>
</TouchableOpacity>

            </View>
          ))
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    color: Colors.PRIMERY,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 20,
  },
  noEventsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  noEventsText: {
    fontSize: 24,
    color: Colors.PRIMERY,
    fontWeight: "bold",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
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