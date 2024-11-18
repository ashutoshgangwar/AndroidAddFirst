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
import Ionicons from "@expo/vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [popupType, setPopupType] = useState(null); // To differentiate popup types
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfileData();
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
    setPopupType("manual"); // Manual popup
    setPopupContent(content);
    setTableData(tableData);
    setShowPopup(true);
  };

  const openProfilePopup = (user) => {
    setPopupType("profile"); // Profile popup
    setPopupContent(
      <View style={styles.profilePopupContent}>
        <View style={styles.crossButtonContainer}>
          <TouchableOpacity onPress={closePopup}>
            <Entypo name="circle-with-cross" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileHeader}>
          <View style={styles.profileInfoContainer}>
            {/* Profile Image */}
            <Image
              source={{
                uri: user.profilePic
                  ? `${API_URL}${user.profilePic}`
                  : "https://via.placeholder.com/150",
              }}
              style={styles.profileImage}
            />
            {/* Profile Info (Name, Role, Location) */}
            <View style={styles.profileDetailsContainer}>
              <Text style={styles.profileName}>{user.fullname || "N/A"}</Text>
              <Text style={styles.profileRole}>
                ({user.registeras || "Role not available"})
              </Text>
              <View style={styles.profileLocation}>
                <Entypo name="location-pin" size={18} color="black" />
                <Text style={styles.profileLocationText}>
                  {user.city || "City not available"},{" "}
                  {user.state || "State not available"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.profileAboutTitle}>About</Text>
        <Text style={styles.profileAboutText}>
          {user.bio || "No bio available"}
        </Text>
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="people-sharp" size={30} color="black" />
            </View>
            <Text style={styles.statValue}>{user.patients || "N/A"}</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Entypo name="briefcase" size={30} color="black" />
            </View>
            <Text style={styles.statValue}>{user.expyear || "N/A"}+</Text>
            <Text style={styles.statLabel}>Years Exp.</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Entypo name="star" size={30} color="black" />
            </View>
            <Text style={styles.statValue}>{user.rating || "N/A"}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <Entypo name="chat" size={30} color="black" />
            </View>
            <Text style={styles.statValue}>{user.reviews || "N/A"}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
        
        <Text style={styles.profileHoursTitle}>Working Hours</Text>
        {user.workingHours
          ? user.workingHours.map((day, index) => (
              <View key={index} style={styles.workingHourRow}>
                <Text style={styles.workingHourDay}>{day.day}</Text>
                <Text style={styles.workingHourTime}>
                  {day.time || "00:00 - 00:00"}
                </Text>
              </View>
            ))
          : null}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => console.log("Book Appointment")}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    );
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
                  onPress={() => openProfilePopup(user)}
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
                    <View style={styles.locationContainer}>
                      <Entypo name="location-pin" size={18} color="black" />
                      <Text style={styles.userLocationText}>
                        {user.city || "City not available"},{" "}
                        {user.state || "State not available"}
                      </Text>
                    </View>
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
          {popupType === "manual" ? (
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
          ) : popupType === "profile" ? (
            popupContent
          ) : null}
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
    borderWidth: 1, // Border added for popup
    borderColor: Colors.GRAY,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContainer: {
    marginVertical: 10,
    borderWidth: 1, // Table border
    borderColor: Colors.GRAY,
    borderRadius: 5,
    overflow: "hidden", // Ensures rounded corners
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 2, // Border between rows
    borderBottomColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 1,
    // borderRightWidth: 2, // Add partition between columns
    borderRightColor: Colors.GRAY,
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

  locationContainer: {
    flexDirection: "row", // Aligns icon and text in a row
    alignItems: "center", // Vertically centers the icon and text
    marginTop: 12, // Adds some spacing
  },

  userLocationText: {
    fontSize: 16,
    color: Colors.GRAY,
    marginLeft: 4, // Adds space between the icon and the text
  },
  profilePopupContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    elevation: 5,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfoContainer: {
    flexDirection: "row", // This will position the image and details side by side
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the left
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15, // Space between image and text
  },

  profileDetailsContainer: {
    flex: 1, // This makes sure the text takes up remaining space
    
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.PRIMERY,
  },
  profileRole: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  profileLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileLocationText: {
    fontSize: 16,
    color: Colors.GRAY,
  },

  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.PRIMERY,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.GRAY,
  },

  profileAboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.PRIMERY,
  },
  profileAboutText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 20,
  },

  profileHoursTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.PRIMERY,
  },
  workingHourRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },
  workingHourDay: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  workingHourTime: {
    fontSize: 14,
    color: Colors.PRIMERY,
  },

  bookButton: {
    marginTop: 20,
    backgroundColor: Colors.PRIMERY,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  crossButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10, // Ensure it appears above other elements
  },
  iconContainer: {
    backgroundColor: Colors.LIGHTGRAY, // Set the background color
    borderRadius: 50, // Make the container circular
    padding: 10, // Add padding around the icon to create space
    justifyContent: "center", // Center the icon
    alignItems: "center", // Align the icon horizontally
  },
});
