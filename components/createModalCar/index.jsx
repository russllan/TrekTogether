import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { car } from "../../store/slices/tripSlice";

export default function index() {
    const [mark, setMark] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [number, setNumber] = useState("");

    const dispatch = useDispatch();
    const result = useSelector((state) => state.trip.result);

    const data = {
        name: mark,
        carMake: number,
        carModel: model,
        carYear: year,
    }

    const onSubmit = () => {
        dispatch(car(data));
    };

  return (
    <View style={styles.viewModal}>
        <View style={styles.viewWrapper}>
            <Text>Какой у вас Автомобиль?</Text>
            <View style={styles.viewInput}>
                <TextInput onChangeText={(e) => setMark(e)} placeholder="Марка"/>
                <TextInput onChangeText={(e) => setModel(e)} placeholder="Модель"/>
                <TextInput onChangeText={(e) => setYear(e)} placeholder="Год выпуска"/>
                <TextInput onChangeText={(e) => setNumber(e)} placeholder="Госномер"/>
            </View>
        <TouchableOpacity onPress={onSubmit}><Text>Добавить</Text></TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewModal: {
        flex: 1,
    },
    viewWrapper: {
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
});