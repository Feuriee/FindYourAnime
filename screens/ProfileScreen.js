import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUsername, setStoredUsername] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Mengecek apakah user sudah login sebelumnya
  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const pass = await AsyncStorage.getItem("password");
      if (user && pass) {
        setIsLoggedIn(true);
        setStoredUsername(user);
      }
    } catch (error) {
      console.error("Gagal mengambil data login:", error);
    }
  };

  // Fungsi login (simpan username & password)
  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Login Gagal", "Username dan Password tidak boleh kosong.");
      return;
    }
    try {
      await AsyncStorage.setItem("user", username);
      await AsyncStorage.setItem("password", password);
      setIsLoggedIn(true);
      setStoredUsername(username);
      Alert.alert("Berhasil", "Anda berhasil login.");
    } catch (error) {
      console.error("Gagal menyimpan data login:", error);
    }
  };

  // Fungsi logout (hapus data login)
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("password");
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
      Alert.alert("Logout", "Anda telah logout.");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Selamat Datang, {storedUsername}!</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginContainer: {
    width: "100%",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
