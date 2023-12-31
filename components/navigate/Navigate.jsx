import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import {
  MaterialIcons,
  Entypo,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";

import LandingPage from "../../pages/LandingPage";
import MainPage from "../../pages/mainPage/MainPage";
import TripsPage from "../../pages/trips/TripsPage";
import FoundTrips from "../../pages/foundTripsPage/FoundTripsPage";
import RegisterPage from "../../pages/register/RegisterPage";
import AuthPage from "../../pages/authPage/AuthPage";
import DriverFilling from "../../pages/driverFilling/DriverFilling";
import CreatePage from "../../pages/CreatePage/CreatePage";
import ProfilePage from "../../pages/profilePage/ProfilePage";
import ReviewPage from "../../pages/reviewPage/ReviewPage";
import DetailPage from "../../pages/detail/DetailPage";

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
            iconName = "trips"; // Замените на нужную иконку Ionicons
            return <MaterialIcons name="drive-eta" size={24} color="green" />;
          } else if (route.name === "Создать") {
            iconName = "create";
            return <Entypo name="plus" size={24} color="black" />;
          } else if (route.name === "Профиль") {
            iconName = "profile";
            return <AntDesign name="user" size={24} color="black" />;
          } else if (route.name === "Уведомления") {
            iconName = "notification";
            return <SimpleLineIcons name="bell" size={24} color="black" />;
          }
          // Возвращаем иконку Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Поездки" component={TripsPage} />
      <Tab.Screen name="Поиск" component={MainPage} />
      <Tab.Screen name="Создать" component={CreatePage} />
      <Tab.Screen name="Профиль" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Main" component={TabNavigate} />
        <Stack.Screen
          name="FoundTrips"
          component={FoundTrips}
          options={({ route }) => ({
            data: route.params.newData,
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="driverFilling"
          component={DriverFilling}
          options={({ route }) => ({
            data: route.params.dataTrip,
            headerShown: true,
          })}
        />
        <Stack.Screen name="Review" component={ReviewPage} options={({route}) => ({
          data: route.params.data,
          headerShown: true
        })} />
        <Stack.Screen name="Detail" component={DetailPage} options={({route}) => ({
          data: route.params.data,
          headerShown: true
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
