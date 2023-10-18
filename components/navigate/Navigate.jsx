import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LandingPage from "../../pages/LandingPage";
import MainPage from "../../pages/mainPage/MainPage";
import TripsPage from "../../pages/trips/TripsPage";
import SearchPage from "../../pages/CreatePage/CreatePage";

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FoundTrips from "../../pages/foundTripsPage/FoundTripsPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigate = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Поиск") {
            iconName = "search";
          } else if (route.name === "Поездки") {
            iconName = "create"; // Замените на нужную иконку Ionicons
            return <MaterialIcons name="drive-eta" size={24} color="green" />
          }
          // Возвращаем иконку Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Поиск"
        component={MainPage}
      />
      <Tab.Screen
        name="Поездки"
        component={TripsPage}
      />
      <Tab.Screen
        name="Создать"
        component={SearchPage}
      />
        <Tab.Screen
        name="Уведомления"
        component={SearchPage}
      />
      <Tab.Screen
        name="Профиль"
        component={SearchPage}
      />
    </Tab.Navigator>
  );
};

export default Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Main" component={TabNavigate} />
        <Stack.Screen name="FoundTrips" component={FoundTrips} options={({route}) => ({
          data:route.params.enteredData,
          headerShown: true
        })} />
        {/* <Stack.Screen name="book" component={} options={({route}) => ({
          data: route.params.data,
          headerShown: false
        })} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
