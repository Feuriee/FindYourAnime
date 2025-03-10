import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailScreen({ route }) {
  const { anime } = route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  // Mengecek apakah anime ini sudah ada di daftar favorit
  const checkFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        const found = favorites.some(item => item.id === anime.id);
        setIsFavorite(found);
      }
    } catch (error) {
      console.error("Gagal mengecek favorit:", error);
    }
  };

  // Menambahkan anime ke daftar favorit
  const addToFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (favorites.some(item => item.id === anime.id)) {
        Alert.alert("Info", "Anime sudah ada di daftar favorit!");
        return;
      }

      favorites.push(anime);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      Alert.alert("Sukses", "Anime ditambahkan ke favorit!");
    } catch (error) {
      console.error("Gagal menambahkan ke favorit:", error);
    }
  };

  // Menghapus anime dari daftar favorit
  const removeFromFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        let favorites = JSON.parse(storedFavorites);
        favorites = favorites.filter(item => item.id !== anime.id);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(false);
        Alert.alert("Dihapus", "Anime dihapus dari favorit.");
      }
    } catch (error) {
      console.error("Gagal menghapus dari favorit:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      {/* ScrollView untuk konten */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: anime.image }} style={styles.image} />
        <Text style={styles.title}>{anime.title}</Text>
        <Text style={styles.description}>{anime.description}</Text>
        <Text style={styles.genre}>Genre: {anime.genre.join(", ")}</Text>

        {/* Tombol Tambah/Hapus Favorit */}
        <TouchableOpacity 
          style={[styles.favButton, { backgroundColor: isFavorite ? "red" : "green" }]} 
          onPress={isFavorite ? removeFromFavorites : addToFavorites}
        >
          <Text style={styles.favText}>{isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#000",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 10,
  },
  genre: {
    fontSize: 14,
    fontStyle: "italic",
    color: "gray",
  },
  favButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  favText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
