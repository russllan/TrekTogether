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
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      const isRegistered = await gettingUser();
      if (isRegistered) {
        navigation.navigate("Landing");
      }
    })();
  }, []);

  onSubmit = () => {
    if (userLogin !== "" && password !== "") {
      dispatch(login(data));
      if (error) {
        Alert.alert("Suesefull", "error.", [{ text: "Ok" }], {
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
        <Text style={{ textAlign: "center" }}>Авторизация</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setLogin(e)}
          placeholder="Введите логин"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => setPassword(e)}
          placeholder="Введите пароль"
        />
        <TouchableOpacity onPress={onSubmit} style={styles.btn}>
          <Text style={{ textAlign: "center" }}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.btn}
        >
          <Text style={{ textAlign: "center" }}>Пройти регистрацию</Text>
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
  viewWrapper: { gap: 15 },
  textInput: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 7,
  },
  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
});
