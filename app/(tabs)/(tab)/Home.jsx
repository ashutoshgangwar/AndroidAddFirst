import { API_URL } from "@env";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import { useRouter, useNavigation } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [activeNews, setActiveNews] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [tableData, setTableData] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState(null); // To store the profile image URL
  const [bio, setBio] = useState(""); // Define bio state

  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchProfileData(); // Fetch profile data on component mount
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found, please login again.");
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data.");
      }

      const data = await response.json();
      setProfileData(data);
      const fetchedImageUri = data.profilePic
        ? `${API_URL}${data.profilePic}`
        : null;
      setImageUri(fetchedImageUri); // Set the image URI correctly
      setBio(data.bio || ""); // Make sure the bio state is set
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfileData(); // Refresh profile data
    setRefreshing(false);
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
            <View style={styles.card}>
              <Image
                source={{ uri: imageUri || profileData?.profilePic }} // Fallback to a default image
                style={styles.cardImage}
              />
              <Text style={styles.name}>{profileData?.fullname}</Text>
              <Text style={styles.bio}>{profileData?.bio}</Text>
            </View>
          </ScrollView>
        </ScrollView>
      )}

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

// ... Styles remain unchanged ...

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
    backgroundColor: Colors.SILVER,
  },
  newsText: {
    fontSize: 16,
  },
  
  card: {
    width: "48%",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
    overflow: "hidden",
    padding:" 20px"
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
    
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
  name: {
    fontSize: 20,
    color: Colors.PRIMERY,
    fontWeight: "bold",
    padding: 5,
    // textDecorationLine: "underline",
  },
  bio: {
    fontSize: 15,
    color: Colors.GRAY,
    marginBottom: 5,
    padding: 10,
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
