// App.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";

export default function Gamedetails() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore the World</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>LET'S SEE WHO IS THE KING OF GAME</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categories}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>Winner</Text>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                source={require("./../../../assets/images/trophy.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.rankContainer}>
            <Text style={styles.rankText}>Score</Text>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                source={require("./../../../assets/images/score.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>Rank</Text>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                source={require("./../../../assets/images/rank.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>Other</Text>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                source={require("./../../../assets/images/score.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.categoryHeader}>Categories:</Text>
        {[
          "Current Affairs",
          "Science Quiz",
          "Technology",
          "General Knowledge",
        ].map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
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
  header: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: Colors.PRIMERY,
    fontSize: 24,
    fontWeight: "bold",
  },
  banner: {
    backgroundColor: "#fbafaf",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    height: 200,
    width: 380,
  },
  bannerText: {
    color: Colors.PRIMERY,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  rankContainer: {
    alignItems: "center", // Center the rank text and icon
    justifyContent: "center", // Center vertically
    // backgroundColor: "#1ff715",
    borderRadius: 30
  },
  rankText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10, // Space between text and icon
    marginTop:12,
    color:"#f71f15"

  },
  categoryButton: {
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 5,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginVertical: 5,
    borderRadius: 5,
    elevation: 1,
  },
  categoryText: {
    fontSize: 16,
  },
});
