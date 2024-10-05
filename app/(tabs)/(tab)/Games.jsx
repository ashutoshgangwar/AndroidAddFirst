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
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter, useNavigation } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [activeNews, setActiveNews] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [tableData, setTableData] = useState([]); // For managing table data
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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

  // Static table data for each category
  const categoryTableData = {
    "Olympic Games": [
      { date: "2024-09-01", sport: "Basketball", institution: "Olympic High" },
      { date: "2024-09-05", sport: "Swimming", institution: "Olympic College" },
    ],
    "College Games": [
      { date: "2024-08-15", sport: "Soccer", institution: "Harvard" },
      { date: "2024-08-20", sport: "Tennis", institution: "Stanford" },
    ],
    "School Games": [
      { date: "2024-07-10", sport: "Track & Field", institution: "Riverdale High" },
      { date: "2024-07-12", sport: "Volleyball", institution: "Westview School" },
    ],
    "State Games": [
      { date: "2024-06-20", sport: "Cricket", institution: "California State University" },
      { date: "2024-06-25", sport: "Hockey", institution: "Texas State" },
    ],
  };

  const handleCategoryClick = (category) => {
    setPopupContent(category); // Set the category name as popup title
    setTableData(categoryTableData[category] || []); // Load the respective table data
    setShowPopup(true); // Show the popup
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore the World</Text>
      </View>
      <ScrollView>
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
              style={[styles.dot, { opacity: activeNews === index ? 1 : 0.3 }]}
            />
          ))}
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.categories}>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>Winner</Text>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => router.push("/(tabs)/Pages/Gamemiddle/Winner")}
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
                onPress={() => router.push("/(tabs)/Pages/Gamemiddle/Rank")}
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
                onPress={() => router.push("/(tabs)/Pages/Gamemiddle/Other")}
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
            ref={scrollViewRef}
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

          <View style={styles.arrowContainer}>
            <TouchableOpacity onPress={nextNews}>
              <Text style={styles.arrow}>➡️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.categoryHeader}>Game Details:</Text>
          {[
            "Olympic Games",
            "College Games",
            "School Games",
            "State Games",
            "Others",
          ].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => handleCategoryClick(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}

          {/* Popup Modal for Categories */}
          <Modal
            visible={showPopup}
            animationType="slide"
            transparent={true}
            onRequestClose={closePopup}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Text style={styles.popupTitle}>{popupContent}</Text>

                {/* Static Table */}
                <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Date</Text>
                    <Text style={styles.tableHeader}>Sport Name</Text>
                    <Text style={styles.tableHeader}>Organization Name</Text>
                  </View>
                  {tableData.map((row, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{row.date}</Text>
                      <Text style={styles.tableCell}>{row.sport}</Text>
                      <Text style={styles.tableCell}>{row.institution}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
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
    backgroundColor: Colors.PRIMERY,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  rankContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 12,
    color: "#f71f15",
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
  newsSlider: {
    marginVertical: 10,
  },
  newsItem: {
    width: screenWidth,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  newsText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  arrowContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  arrow: {
    fontSize: 30,
    color: Colors.PRIMERY,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContent: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeader: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: Colors.PRIMERY,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});
