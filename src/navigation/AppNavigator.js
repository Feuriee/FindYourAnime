import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import halaman
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
