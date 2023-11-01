import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { car, trip } from "../../store/slices/tripSlice";

export default function DriverFilling({ dataTrip }) {
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [btn, setBtn] = useState(false);

  const result = useSelector((state) => state.trip.Car.result);

  const dispatch = useDispatch();

  const data = {
    name: mark,
    carMake: model,
    carModel: year,
    carYear: number,
  };

  const onSubmit = () => {
    dispatch(car(data));
    setBtn(!btn);
  };

  const newDataTrip = {
    ...dataTrip,
    carId: result.carId
  }

  const onCreate = () => {
    dispatch(trip(newDataTrip));
  };

  return (
    <View style={styles.viewMain}>
      <View style={styles.viewWrapper}>
        <Text>Какой у вас Автомобиль?</Text>
        <View style={styles.inputs}>
          <TextInput onChangeText={(e) => setMark(e)} placeholder="Марка" />
          <TextInput onChangeText={(e) => setModel(e)} placeholder="Модель" />
          <TextInput
            onChangeText={(e) => setYear(e)}
            placeholder="Год выпуска"
          />
          <TextInput
            onChangeText={(e) => setNumber(e)}
            placeholder="Госномер"
          />
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text>Сохранить</Text>
        </TouchableOpacity>
        {btn ? (
          <TouchableOpacity onPress={onCreate}>
            <Text>Создать поездку</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
  },
});
