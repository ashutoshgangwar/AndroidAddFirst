import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions, Animated } from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Gamedetails() {
  const [activeNews, setActiveNews] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const progressAnim = useRef(new Animated.Value(0)).current; // Animated value for progress

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const images = [
    require("./../../../assets/images/status.jpeg"),
    require("./../../../assets/images/status1.jpeg"),
    require("./../../../assets/images/news.jpeg"),
    require("./../../../assets/images/news1.jpeg"),
    require("./../../../assets/images/news2.jpeg"),
    require("./../../../assets/images/news3.jpeg"),
  ];

  const onScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveNews(slide);
    // Animate progress bar based on current slide
    Animated.timing(progressAnim, {
      toValue: slide, // Set target value
      duration: 500, // Animation duration
      useNativeDriver: false, // Use native driver
    }).start();
  };

  // Calculate the width of the animated progress bar
  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, images.length - 1],
    outputRange: [0, screenWidth], // Full width of the screen
  });

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusContainer}>
        <Animated.View style={[styles.statusBar, { width: progressBarWidth }]} />
      </View>
      
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.sliderContainer}
        ref={scrollViewRef}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.bannerImage} />
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
  statusContainer: {
    height: 5, // Height of the status bar
    backgroundColor: '#e0e0e0', // Background color of the status bar
    width: '100%', // Full width
    overflow: 'hidden', // Hide overflow to keep the bar contained
    position: 'absolute', // Position at the top
    top: 0, // Align to the top
  },
  statusBar: {
    height: '100%', // Full height of the status container
    backgroundColor: Colors.PRIMERY, // Color of the animated progress bar
  },
  sliderContainer: {
    height: screenHeight, // Full screen height
    marginTop: 5, // Space between the status bar and the image slider
  },
  bannerImage: {
    width: screenWidth,
    height: screenHeight, // Full screen height
    resizeMode: "cover",
    marginTop:10,
    marginBottom:10
  },
});
