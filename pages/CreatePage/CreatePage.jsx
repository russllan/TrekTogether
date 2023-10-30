import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default CreatePage = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [date, setDate] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  AsyncStorage.getItem("user")
    .then((value) => {
      if (value !== null) {
        const userData = JSON.parse(value);
        setUser(userData);
        console.log("значение: ", user);
      } else {
        console.log("значение не найдено");
      }
    })
    .catch((error) => {
      console.error("Ошибка при получении данных из AsyncStorage: ", error);
    });

  useEffect(() => {
    console.log("Значение user:", user);
  }, [user]);

  const data = {
    departureCity: startPoint,
    arrivalCity: endPoint,
    departureData: date,
    // price: price,
    // availableSeats: amount,
    // driverId: userId,
    // carId: 0
  };

  const onSubmit = () => {
    navigation.navigate("", data);
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.wrapperView}>
        <TextInput
          onChange={(e) => setStartPoint(e)}
          style={styles.textInput}
          placeholder="Откуда"
        />
        <TextInput
          onChange={(e) => setEndPoint(e)}
          style={styles.textInput}
          placeholder="Куда"
        />
        <TouchableOpacity
          style={styles.select}
          onPress={() => setModalActive(!modalActive)}
        >
          <Text>{date ? date : "Выбрать"}</Text>
        </TouchableOpacity>
        <Modal isVisible={modalActive}>
          <Calendar
            onDayPress={(day) => {
              setDate(day.dateString);
              setModalActive(!modalActive);
            }}
            markedDates={{
              [date]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        </Modal>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.btn} onPress>
            <Text style={{ textAlign: "center" }}>Создать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperView: {
    width: "90%",
    padding: 30,
    gap: 22,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "white",
  },
  textInput: {
    backgroundColor: "#d9d9d9",
    padding: 12,
    borderRadius: 7,
  },
  select: {
    backgroundColor: "#d9d9d9",
    padding: 12,
    borderRadius: 7,
  },
  viewBtn: {},
  btn: {
    padding: 20,
    borderRadius: 7,
    backgroundColor: "black",
  },
});
