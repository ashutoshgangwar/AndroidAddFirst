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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersdata, setUsersdata] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchProfileData(); // Fetch profile data on component mount
  }, []);

  useEffect(() => {
    console.log("usersdata updated:", usersdata);
  }, [usersdata]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch users details");
      }
      const data = await response.json();
      setUsersdata(data);

      // Log and set image URL
      const fetchedImageUri = data.profilePic
        ? `${API_URL}${data.profilePic}`
        : "https://via.placeholder.com/150";

      console.log("Fetched Image URI:", fetchedImageUri);
      setImageUri(fetchedImageUri);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
      setError(error.message);
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

            {/* Profile Data */}

            {Array.isArray(usersdata) &&
              usersdata.map((user, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() =>
                    openPopup( <Text style={styles.userName}>
                      {user.fullname || "Name not available"}
                    </Text>, [
                      ["Specsilization Age", user.expert || "N/A"],
                      ["Total Experience", user.expyear || "N/A"],
                      ["Language Known", user.language || "N/A"],
                    ])
                  }
                >
                  {/* User Image */}
                  <Image
                    source={{
                      uri: user.profilePic
                        ? `${API_URL}${user.profilePic}`
                        : "https://via.placeholder.com/150",
                    }}
                    style={styles.userImage}
                    onError={() =>
                      console.error("Failed to load image:", user.profilePic)
                    }
                  />

                  {/* User Details */}
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>
                      {user.fullname || "Name not available"}
                    </Text>
                    <Text style={styles.userNameTitle}>
                      ({user.registeras || "Role not available"})
                    </Text>
                    <Text style={styles.statusMessage}>
                      {user.bio || "Bio not available"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
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
    flexDirection: "row", // Arrange cards in a row
    flexWrap: "wrap", // Allow wrapping when there are more than 2 cards
    justifyContent: "space-between", // Space between the cards
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
    backgroundColor: Colors.SILVER,
  },
  newsText: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3, // For shadow effect
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 10,
  },
  userDetails: {
    flex: 1, // Take up available space
  },

  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMERY,
  },
  userNameTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.GRAY,
  },

  statusMessage: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 2,
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
