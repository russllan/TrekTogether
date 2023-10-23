import { useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.auth.registerUser.result);

  const data = {
    name: username,
    password: password,
    phoneNumber: phone,
    isDriver: false,
  };

  const onSubmit = () => {
    if (username !== "") {
      if (phone !== "") {
        if (password !== "") {
          if (error === false) {
            dispatch(register(data));
            console.log(result);
            navigation.navigate("Auth");
          }
        }
      }
    }
    setError(!error);
 
    // fetch("http://192.168.178.14:5077/api/Cars")
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   return response.json(); // Парсим ответ как JSON
    // })
    // .then((data) => {
    //   console.log("Полученные данные:", data);
    // })
 
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxvZ2lufGVufDB8fDB8fHww&w=720",
      }}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <View style={styles.viewRegister}>
        <View style={{ flexDirection: "column", gap: 15 }}>
          <Text style={styles.title}>Регистрация</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(e) => setUsername(e)}
            placeholder="Введите ваше имя"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(e) => setPhone(e)}
            placeholder="Введите ваш номер телефона"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(e) => setPassword(e)}
            placeholder="Введите пароль"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={{ textAlign: "center" }}>Зарегистрироваться</Text>
          </TouchableOpacity>
          {error ? <Text>error synacsis</Text> : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewRegister: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
});
