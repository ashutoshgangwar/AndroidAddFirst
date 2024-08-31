import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../../constants/Colors';

const { width } = Dimensions.get('window');

const images = [
  require('./../../../assets/images/logo1.jpeg'),
  require('./../../../assets/images/logo2.jpeg'),
  require('./../../../assets/images/logo.jpeg'),
];

export default function Games() {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);

    if (index === images.length - 1) {
      flatListRef.current.scrollToIndex({ animated: false, index: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Games (Matches)
      </Text>

      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={item}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items from the top
    padding: 15, // Add padding to the container
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20, // Space between text and image slider
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Full width of the screen
    height: undefined,
    aspectRatio: 16 / 9, // Adjust based on your image aspect ratio
  },
});
