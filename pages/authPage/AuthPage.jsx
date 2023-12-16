import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gStyles } from "../../assets/global styles/styles";

export default function AuthPage() {
  const [userLogin, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    name: userLogin,
    password: password,
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const error = useSelector((state) => state.auth.loginUser.error);

  const gettingUser = async () => {
    try {
      const userId = await AsyncStorage.getItem("user");
      if (userId !== null) {
        const res = JSON.parse(userId);
        return res;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error", err);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const isRegistered = await gettingUser();
      if (isRegistered) {
        navigation.navigate("Main");
      }
    })();
  }, []);

  onSubmit = async () => {
    if (userLogin !== "" && password !== "") {
      await dispatch(login(data));
      if (error !== false) {
        Alert.alert("Message", "Такого пользователя нет", [{ text: "Ok" }], {
          cancelable: false,
        });
      } else {
        navigation.navigate("Landing");
      }
    }
  };

  return (
    <View style={styles.viewAuth}>
      <View style={styles.viewWrapper}>
        <Text style={gStyles.h1}>Аутентификация</Text>
        <Text style={{ paddingBottom: 30 }}>Войдите в свой аккаунт</Text>
        <TextInput
          style={gStyles.textInput}
          onChangeText={(e) => setLogin(e)}
          placeholder="Введите логин"
        />
        <TextInput
          style={gStyles.textInput}
          onChangeText={(e) => setPassword(e)}
          placeholder="Введите пароль"
        />
        <TouchableOpacity onPress={onSubmit} style={gStyles.btn}>
          <Text style={gStyles.text}>Войти</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewRegister}>
        <Text style={{textAlign: "center", paddingBottom: 10}}>Нет аккаунта?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.text}>Зарегистрируйся прямо сейчас!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewAuth: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewWrapper: {
    width: "80%",
    gap: 20,
    paddingBottom: 40,
  },
  text: {
    color: "#004F39",
    borderBottomWidth: 1,
    borderBottomColor: '#004F39',
    marginBottom: 5,
  },
});
