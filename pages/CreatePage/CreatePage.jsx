import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { gStyles } from "../../assets/global styles/styles";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GetUserID } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { addTrip } from "../../store/slices/tripSlice";
import { useDispatch } from "react-redux";

export default CreatePage = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [amount, setAmount] = useState(1);

  // const result = useSelector((state) => state.trip.Car.result);
  // const error = useSelector((state) => state.trip.Car.error);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setUser(GetUserID());
  // }, []);

  const getCarId = async () => {
    try {
      const carId = await AsyncStorage.getItem("car");
      return carId ? JSON.parse(carId) : null;
    } catch (error) {
      console.error(
        "Ошибка при получении информации о машине из AsyncStorage:",
        error
      );
      return null;
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date); // Преобразуем строку в дату
    if (isNaN(parsedDate)) {
      console.error("Invalid date:", date);
      return null; // Возвращаем null или обрабатываем ошибку
    }
    console.log(parsedDate.toISOString());
    return parsedDate.toISOString(); // Преобразуем в ISO-формат
  };

  const onSubmit = async () => {
    const driverId = await GetUserID();
    const car = await getCarId();
    let data = null;
    if (car !== null) {
      data = {
        departureCity: startPoint,
        arrivalCity: endPoint,
        departureData: formatDate(date),
        price: Number(price),
        availableSeats: amount,
        driverId: driverId,
        carId: car,
      };
    } else {
      data = {
        departureCity: startPoint,
        arrivalCity: endPoint,
        departureData: formatDate(date),
        price: Number(price),
        availableSeats: amount,
        driverId: driverId,
      };
    }

    if (car !== null) {
      Alert.alert(
        "Подтверждение",
        "У вас уже есть добавленная машина, хотите изменить машину?",
        [
          {
            text: "Нет",
            style: "cancel",
            onPress: () => {
              dispatch(addTrip(data));
              Alert.alert(
                "message",
                "Ваша поездка созданна!",
                [
                  {
                    text: "ОК",
                  },
                ],
                { cancelable: false }
              );
              navigation.navigate("Main");
            },
          },
          {
            text: "Да",
            onPress: () => {
              AsyncStorage.removeItem("car");
              navigation.navigate("driverFilling", {
                dataTrip: data,
                carId: data.carId,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("driverFilling", {
        dataTrip: data,
        carId: data.carId,
      });
    }

    console.log("awd " + data.carId);
    // navigation.navigate("driverFilling", {
    //   dataTrip: data,
    //   carId: data.carId,
    // });
    setStartPoint("");
    setEndPoint("");
    setPrice("");
    setDate("");
    console.log(data);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.wrapperView}>
        <TextInput
          onChangeText={(e) => setStartPoint(e)}
          style={gStyles.textInput}
          placeholder="Откуда"
        />
        <TextInput
          onChangeText={(e) => setEndPoint(e)}
          style={gStyles.textInput}
          placeholder="Куда"
        />
        <TextInput
          onChangeText={(e) => setPrice(e)}
          value={price}
          style={gStyles.textInput}
          placeholder="Укажите стоимость поездки"
          keyboardType="numeric"
        />
        <View style={styles.viewOptions}>
          <View>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setModalActive(!modalActive)}
            >
              <Text>{date || "Выбрать дату"}</Text>
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
          </View>
          <View style={styles.quantity}>
            <TouchableOpacity
              style={styles.operation}
              onPress={() => (amount === 1 ? 1 : setAmount(amount - 1))}
            >
              <Text style={{ color: "silver" }}>—</Text>
            </TouchableOpacity>
            <View>
              <Text>{amount}</Text>
            </View>
            <TouchableOpacity
              style={styles.operation}
              onPress={() => setAmount(amount + 1)}
            >
              <Text style={{ color: "#13f043", fontSize: 15 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={gStyles.btn} onPress={onSubmit}>
            <Text style={gStyles.text}>Создать</Text>
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
    marginTop: 10,
  },
  wrapperView: {
    width: "96%",
    padding: 15,
    gap: 20,
  },
  select: {
    backgroundColor: "#d9d9d9",
    padding: 12,
    borderRadius: 7,
  },
  viewOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
    borderColor: "#d9d9d9",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 7,
  },
  operation: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: "#d9d9d9",
    borderLeftColor: "#d9d9d9",
    borderLeftWidth: 1,
  },
});
