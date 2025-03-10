import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import animeList from '../data/animeList';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Filter anime berdasarkan pencarian
  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Input Pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari anime..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List Anime */}
      <FlatList
        data={filteredAnime}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.animeItem}
            onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { anime: item } })} // Gunakan "Detail" sesuai Stack di App.js
          >
            <Image source={{ uri: item.image }} style={styles.animeImage} />
            <Text style={styles.animeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  animeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  animeImage: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 5,
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
