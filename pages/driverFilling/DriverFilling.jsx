import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gStyles } from "../../assets/global styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { addTrip, car } from "../../store/slices/tripSlice";

export default function DriverFilling({ route }) {
  const dataTrip = route.params;
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [btn, setBtn] = useState(false);

  const result = useSelector((state) => state.trip.Car.result);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const data = {
    name: mark,
    gosNomer: number,
    carModel: model,
    carYear: year,
    userId: dataTrip.driverId
  };

  const onSubmit = () => {
    console.log(dataTrip);
    dispatch(car(data));
    setBtn(!btn);
  };

  const newDataTrip = {
    ...dataTrip,
    carId: result.id,
  };

  const onCreate = () => {
    dispatch(addTrip(newDataTrip));
    Alert.alert(
      'message',
      'Ваша поездка созданна!',
      [
        {
          text: 'ОК',
        },
      ],
      { cancelable: false }
    );
    navigation.navigate("Main");
  };

  return (
    <View style={styles.viewMain}>
      <View style={styles.viewWrapper}>
        <Text style={gStyles.text}>Какой у вас Автомобиль?</Text>
        <View style={styles.inputs}>
          <TextInput
            onChangeText={(e) => setMark(e)}
            style={gStyles.textInput}
            placeholder="Марка"
          />
          <TextInput
            onChangeText={(e) => setModel(e)}
            style={gStyles.textInput}
            placeholder="Модель"
          />
          <TextInput
            onChangeText={(e) => setYear(e)}
            placeholder="Год выпуска"
            style={gStyles.textInput}
          />
          <TextInput
            onChangeText={(e) => setNumber(e)}
            placeholder="Госномер"
            style={gStyles.textInput}
          />
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={onSubmit} style={gStyles.btn}>
            <Text>Сохранить</Text>
          </TouchableOpacity>
          {btn ? (
            <TouchableOpacity onPress={onCreate} style={gStyles.btn}>
              <Text>Создать поездку</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    top: 60,
  },
  viewWrapper: { padding: 20 },
  inputs: {
    gap: 12,
    marginTop: 10,
    marginBottom: 40,
  },
  viewBtn: {
    alignItems: "center",
    gap: 15
  }
});
