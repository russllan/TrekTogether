import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { GetUserData } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../store/slices/reviewSlice";
import { gStyles } from "../../assets/global styles/styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default MainPage = () => {
  const [user, setUser] = useState();
  const [active, setActive] = useState(false);
  const [comment, setActiveComment] = useState(false);
  const result = useSelector((state) => state.review.reviewData.result);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getData = async () => {
    const data = await GetUserData();
    setUser(data);
  };

  useEffect(() => {
    getData();
    setActive(false);
    setActiveComment(false);
  }, []);

  console.log(result);

  if (user === undefined) {
    return (
      <View>
        <Text>...Loading</Text>
      </View>
    );
  }

  const getRating = () => {
    if (user) {
      dispatch(getReview(user.id));
      setActive(!active);
    }
  };

  const logout = () => {
    AsyncStorage
      .removeItem("user")
      .then(() => console.log("User has logged out"))
      .catch((error) => console.error("Error removing user data: ", error));
      navigation.navigate("Auth");
  };

  const renderReviews = result.map((innerArray, outerIndex) => (
    <View key={outerIndex}>
      {innerArray.map((item) => (
        <Text key={item.id}>Отзывы: {item.comment}</Text>
      ))}
    </View>
  ));

  return (
    <View style={styles.main}>
      <View style={styles.wrapper}>
        <View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDbVoT5honyegmW0jhN-4HK5SRc7y_GoFoW0bWPmJnOzDGsZFGYErcHAtcIfIOyQmfij4&usqp=CAU",
            }}
            style={styles.avatar}
          />
          <Text style={{ textAlign: "center", fontSize: 20 }}>{user.name}</Text>
        </View>
        <View>
          {active ? (
            result.map((innerArray, outerIndex) => (
              <View style={styles.viewRating} key={outerIndex}>
                {innerArray.map((item) => (
                  <Text key={item.id}>Рейтинг: {item.rating} / 5</Text>
                ))}
              </View>
            ))
          ) : (
            <TouchableOpacity onPress={getRating}>
              <Text>Показать рейтинг</Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text>Телефон: {user.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View>
          {comment ? (
            renderReviews
          ) : (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Review", result)}
            >
              <Text style={gStyles.text}>Просмотреть отзывы</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity style={gStyles.btnRed} onPress={logout}>
            <Text style={gStyles.text}>Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    width: 309,
    height: 329,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 20,
    padding: 30,
    alignItems: "center",
    gap: 15,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 80,
    marginBottom: 10,
  },
  viewRating: {
    justifyContent: "space-between",
  },
  container: {
    paddingTop: 15,
    alignItems: "center",
    gap: 30,
  },
  btn: {
    width: 300,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#3B4340",
  },
});
