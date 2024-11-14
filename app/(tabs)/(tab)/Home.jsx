import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  RefreshControl,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter, useNavigation } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [activeNews, setActiveNews] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [tableData, setTableData] = useState([]); // For managing table data
  const [games, setGames] = useState([]); // For fetched game data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchGames(); // Fetch games data on component mount
  }, []);

  // Fetch data from API
  const fetchGames = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://192.168.1.5:6000/gamedetail");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGames(data); // Set the fetched data to state
    } catch (error) {
      setError(error.message); // Set error if any
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle pull-down-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Start the refresh animation
    await fetchGames(); // Re-fetch the data
    setRefreshing(false); // Stop the refresh animation
  };

  const images = [
    require("./../../../assets/images/rank.jpeg"),
    require("./../../../assets/images/news.jpeg"),
    require("./../../../assets/images/news1.jpeg"),
    require("./../../../assets/images/news2.jpeg"),
    require("./../../../assets/images/news3.jpeg"),
  ];

  const newsItems = [
    "Economy Update",
    "Sports Highlights",
    "Political Debate",
    "Weather Forecast",
  ];

  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveNews(slide);
  };

  const nextNews = () => {
    const nextSlide = (activeNews + 1) % newsItems.length;
    setActiveNews(nextSlide);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: nextSlide * screenWidth,
        animated: true,
      });
    }
  };

  const openPopup = (content, tableData) => {
    setPopupContent(content);
    setTableData(tableData);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("./../Pages/Profile")}>
          <Entypo name="menu" size={40} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Explore the World</Text>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={styles.sliderContainer}
          >
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.bannerImage} />
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: activeNews === index ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.categories}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>Winner</Text>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() =>
                    openPopup("Winner", [
                      ["John Doe", "Team A", "100 Points"],
                      ["Jane Smith", "Team B", "90 Points"],
                    ])
                  }
                >
                  <Image
                    source={require("./../../../assets/images/trophy.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>Rank</Text>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() =>
                    openPopup("Rank", [
                      ["1", "John Doe", "Team A"],
                      ["2", "Jane Smith", "Team B"],
                    ])
                  }
                >
                  <Image
                    source={require("./../../../assets/images/rank.jpeg")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>Live Score</Text>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() =>
                    openPopup("Live Score", [
                      ["Team A", "50"],
                      ["Team B", "40"],
                    ])
                  }
                >
                  <Image
                    source={require("./../../../assets/images/other.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.categoryHeader}>Current Affairs:</Text>

            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.newsSlider}
            >
              {newsItems.map((news, index) => (
                <View key={index} style={styles.newsItem}>
                  <Text style={styles.newsText}>{news}</Text>
                </View>
              ))}
            </ScrollView>

            {/* <View style={styles.arrowContainer}>
              <TouchableOpacity onPress={nextNews}>
                <Text style={styles.arrow}>➡️</Text>
              </TouchableOpacity>
            </View> */}

            {/* New Card Section for fetched games data */}
            <View style={styles.cardContainer}>
              {games.map((game, index) => (
                <View key={index} style={styles.card}>
                  <Image
                    source={{ uri: game.imageUrl }} // Assuming the API returns an image URL
                    style={styles.cardImage}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{game.gamename}</Text>
                    <Text style={styles.cardDescription}>{game.details}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      )}

      {/* Modal for Popup */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={closePopup}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>{popupContent}</Text>
            <View style={styles.tableContainer}>
              {tableData.map((row, index) => (
                <View key={index} style={styles.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.tableCell}>
                      {cell}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    color: Colors.PRIMERY,
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 80,
  },
  sliderContainer: {
    height: imageHeight,
    marginTop: 5,
    marginBottom: 1,
  },
  bannerImage: {
    width: screenWidth,
    height: imageHeight,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMERY,
    margin: 8,
  },
  content: {
    padding: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rankContainer: {
    alignItems: "center",
    flex: 1,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  newsSlider: {
    height: 50,
  },
  newsItem: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: 50,
    backgroundColor: Colors.LIGHTGRAY,
    backgroundColor:Colors.SILVER
  },
  newsText: {
    fontSize: 16,
  },
  // arrowContainer: {
  //   alignItems: "center",
  //   marginVertical: 10,
  //   // backgroundColor:Colors.PRIMERY
    
  // },
  // arrow: {
  //   fontSize: 30,
  //   color: Colors.PRIMERY,
    
  // },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
    marginTop:40
  },
  card: {
    width: "48%",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    width: "80%",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContainer: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: Colors.PRIMERY,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
