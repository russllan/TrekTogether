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

import { useDispatch, useSelector } from "react-redux";
import { trip } from "../../store/slices/tripSlice";
import DriverFilling from "../driverFilling/DriverFilling";

export default CreatePage = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [amount, setAmount] = useState(1);
  const [car, setCar] = useState(0);

  const [user, setUser] = useState(0);

  // const result = useSelector((state) => state.trip.Car.result);
  // const error = useSelector((state) => state.trip.Car.error);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const newValue = Number(price);

  const GetUserID = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const userData = JSON.parse(value);
        console.log(userData.id);
        setUser(userData.id);
        return userData.id;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  GetUserID();

  const data = {
    departureCity: startPoint,
    arrivalCity: endPoint,
    departureData: date,
    price: newValue,
    availableSeats: amount,
    driverId: user,
  };

  const onSubmit = () => {
    navigation.navigate("driverFilling", data);
    // return <DriverFilling dataTrip={data}  />
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.wrapperView}>
        <TextInput
          onChangeText={(e) => setStartPoint(e)}
          style={styles.textInput}
          placeholder="Откуда"
        />
        <TextInput
          onChangeText={(e) => setEndPoint(e)}
          style={styles.textInput}
          placeholder="Куда"
        />
        <TextInput
          onChangeText={(e) => setPrice(e)}
          value={price}
          style={styles.textInput}
          placeholder="Укажите стоимость поездки"
          keyboardType="numeric"
        />
        <View style={styles.viewOptions}>
          <View>
            <TouchableOpacity
              style={styles.select}
              onPress={() => setModalActive(!modalActive)}
            >
              <Text>{date ? date : "Выбрать дату"}</Text>
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
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
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
  viewOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewBtn: {},
  btn: {
    padding: 20,
    borderRadius: 7,
    backgroundColor: "black",
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
