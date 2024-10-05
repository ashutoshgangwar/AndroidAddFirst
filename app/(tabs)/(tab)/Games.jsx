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
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

// Calculate image height based on screen width to maintain aspect ratio
const imageHeight = screenWidth * 0.5625; // 16:9 aspect ratio

export default function Gamedetails() {
  const [activeSlide, setActiveSlide] = useState(0); // Tracks the current slide
  const scrollViewRef = useRef(null); // Reference to the ScrollView
  const router = useRouter();

  const images = [
    require("./../../../assets/images/news.jpeg"),
    require("./../../../assets/images/news3.jpeg"),
    require("./../../../assets/images/rank.jpeg"),
    require("./../../../assets/images/rank.jpeg"),
    require("./../../../assets/images/news1.jpeg"),
    require("./../../../assets/images/news2.jpeg"),
  ];

  // Function to handle the current slide change
  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveSlide(slide);
  };

  // Auto-slide functionality using useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextSlide = (activeSlide + 1) % images.length; // Moves to the next slide, loops back to 0 at the end
      setActiveSlide(nextSlide);

      // Scroll to the next slide
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextSlide * screenWidth,
          animated: true,
        });
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [activeSlide]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Explore the World</Text>
      </View>
      <ScrollView>
        {/* Image Slider */}
        <ScrollView
          ref={scrollViewRef} // Attach reference to ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll} // Detects slide change
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
                { opacity: activeSlide === index ? 1 : 0.3 }, // Active slide highlighted
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
                onPress={() => router.push("./../../../Components/winner.jsx")} 
              >
                <Image
                  source={require("./../../../assets/images/trophy.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>Rank</Text>
              <TouchableOpacity style={styles.categoryButton}>
                <Image
                  source={require("./../../../assets/images/rank.jpeg")}
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
            "General Knowledge",
            "General Knowledge",
          ].map((category, index) => (
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
    height: imageHeight, // Responsive height
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
});
