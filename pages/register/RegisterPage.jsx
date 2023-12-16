import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { gStyles } from "../../assets/global styles/styles";

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const result = useSelector((state) => state.auth.registerUser.result);

  const data = {
    name: username,
    password: password,
    phoneNumber: phone,
    isDriver: false,
    rating: 0,
  };

  const onSubmit = () => {
    if (username !== "") {
      if (phone !== "") {
        if (password !== "") {
          if (error !== false) {
            dispatch(register(data));
            Alert.alert(
              "message",
              "Вы зарегистрированы",
              [
                {
                  text: "ОК",
                },
              ],
              { cancelable: false }
            );
            console.log(result);
            return navigation.navigate("Auth");
          }
        }
      }
    }
    setError(!error);
  };

  return (
    <View style={styles.viewRegister}>
      <View style={{ flexDirection: "column", gap: 20, width: "80%", height: "50%", justifyContent: "space-evenly" }}>
        <Text style={gStyles.h1}>Регистрация</Text>
        <Text style={{ paddingBottom: 30 }}>Регистрация</Text>
        <TextInput
          style={gStyles.textInput}
          onChangeText={(e) => setUsername(e)}
          placeholder="Введите ваше имя"
        />
        <TextInput
          style={gStyles.textInput}
          onChangeText={(e) => setPhone(e)}
          placeholder="Введите ваш номер телефона"
        />
        <TextInput
          style={gStyles.textInput}
          onChangeText={(e) => setPassword(e)}
          placeholder="Введите пароль"
          secureTextEntry={true}
        />
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={gStyles.btn} onPress={onSubmit}>
            <Text style={gStyles.text}>Зарегистрироваться</Text>
          </TouchableOpacity>
          {error ? <Text>error synacsis</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewRegister: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
  },
});
