import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import animeList from "../data/animeList";


const{width}=Dimensions.get('window')
export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { anime: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff", justifyContent:"center", alignItems:"center"},
  card: { marginBottom: 10, borderRadius: 10, overflow: "hidden", backgroundColor: "#eee", width:width*0.9, justifyContent:"center", alignItems:"center"},
  image: { width: "100%", height: 200 },
  title: { padding: 10, fontSize: 18, fontWeight: "bold" },
});