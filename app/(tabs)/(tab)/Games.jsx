import React from 'react';
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const astrologers = [
  {
    id: '1',
    name: 'Ramyanasha',
    expertise: 'Tarot, Life Coach',
    languages: 'English, Hindi, Maithili',
    experience: '3 Years',
    orders: '4699',
    price: '₹ 5/min',
    originalPrice: '₹ 16/min',
    imageUrl: 'https://path-to-image.jpg', // Replace with real image URL
  },
  {
    id: '2',
    name: 'Soumya',
    expertise: 'Tarot',
    languages: 'English, Hindi',
    experience: '6 Years',
    orders: '6770',
    price: '₹ 5/min',
    originalPrice: '₹ 44/min',
    imageUrl: 'https://path-to-image.jpg', // Replace with real image URL
  },
  // Add more astrologers...
];

export default function AstrologerScreen() {
  const renderAstrologer = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.expertise}</Text>
        <Text>{item.languages}</Text>
        <Text>Exp: {item.experience}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with Astrologer</Text>
      </View>

      {/* Categories */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categories}>
        <TouchableOpacity style={styles.category}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category}>
          <Text>Love</Text>
        </TouchableOpacity>
        {/* Add more categories */}
      </ScrollView>

      {/* Astrologers List */}
      <FlatList
        data={astrologers}
        renderItem={renderAstrologer}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Live</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Remedies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFEB3B',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  category: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginRight: 10,
    color: '#888',
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
  },
  chatButton: {
    backgroundColor: '#00E676',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  chatText: {
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
});