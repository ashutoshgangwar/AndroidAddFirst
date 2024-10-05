import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter, useNavigation } from "expo-router";

const screenWidth = Dimensions.get("window").width;

// Calculate image height based on screen width to maintain aspect ratio
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [activeNews, setActiveNews] = useState(0); // Tracks the current news item
  const scrollViewRef = useRef(null); // Reference to the ScrollView for news items
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
    "News 1: Economy Update",
    "News 2: Sports Highlights",
    "News 3: Political Debate",
    "News 4: Weather Forecast",
  ];

  // Function to handle the current news change
  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveNews(slide);
  };

  // Function to handle news navigation
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore the World</Text>
      </View>
      <ScrollView>
        {/* Image Slider */}
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

        {/* Pagination Dots */}
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

          
          {/* Current Affairs Section */}
          <Text style={styles.categoryHeader}>Current Affairs:</Text>

          {/* News Items Slider */}
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

          {/* Navigation Arrow */}
          <View style={styles.arrowContainer}>
            <TouchableOpacity onPress={nextNews}>
              <Text style={styles.arrow}>➡️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.categoryHeader}>Game Details:</Text>
          {[ "Olympic News", "College Games", "School Games", "State Games", "General Knowledge" ].map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}

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
    width: screenWidth, // Full width for the news item
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
});

