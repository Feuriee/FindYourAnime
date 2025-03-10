import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  // Mengambil daftar favorit dari AsyncStorage
  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Gagal mengambil data favorit:", error);
    }
  };

  // Menghapus anime dari favorit
  const removeFavorite = async (id) => {
    try {
      const newFavorites = favorites.filter((item) => item.id !== id);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      Alert.alert("Dihapus", "Anime telah dihapus dari favorit.");
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Anime Favorit</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Kamu belum menambahkan anime favorit!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Navigasi ke DetailScreen */}
              <TouchableOpacity
                style={styles.animeContent}
                onPress={() => navigation.navigate("Home", { screen: "Detail", params: { anime: item } })}
              >
                <Image source={{ uri: item.image }} style={styles.animeImage} />
                <Text style={styles.animeTitle}>{item.title}</Text>
              </TouchableOpacity>

              {/* Tombol Hapus */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeFavorite(item.id)}>
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

// Style Terbaru
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  animeContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Biar teks memenuhi space tersisa
  },
  animeImage: {
    width: 70,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1, // Agar teks tidak terpotong
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
