import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Fix import
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DetailScreen from "./screens/DetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack untuk Home + DetailScreen
function HomeStack() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitle: "Find Your Anime", // Menetapkan nama aplikasi di header semua tab
          headerStyle: { backgroundColor: '#FFFFFF' }, // Warna header (opsional)
          headerTintColor: '#000', // Warna teks header (opsional)
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Search') iconName = 'search-outline';
            else if (route.name === 'Favorites') iconName = 'heart-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: true }} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}
