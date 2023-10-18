import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { data } from "../../constants/dataTrips";

export default Form = () => {
  const [destination, setDestination] = useState("");
  const [arrival, setArrival] = useState("");
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState(false);
  const [amount, setAmount] = useState(1);

  const navigation = useNavigation()

  const enteredData = {
    startPoint: destination,
    endPoint: arrival,
    date: selected,
    passengers: amount
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          onChange={(e) => setDestination(e)}
          placeholder="Откуда"
        />
        <TextInput
          style={styles.textInput}
          onChange={(e) => setArrival(e)}
          placeholder="Куда"
        />
      </View>
      <View style={styles.date}>
        <TouchableOpacity
          onPress={() => setActive(!active)}
          style={styles.textInput}
        >
          <Text style={{ color: "#242424" }}>
            {selected === "" ? `Сегодня` : selected}
          </Text>
        </TouchableOpacity>
        <View style={styles.quantity}>
          <View style={styles.operation}>
            <TouchableOpacity
              onPress={() => (amount === 1 ? 1 : setAmount(amount - 1))}
            >
              <Text style={{ color: "silver" }}>—</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{amount}</Text>
          </View>
          <View style={styles.operation}>
            <TouchableOpacity onPress={() => setAmount(amount + 1)}>
              <Text style={{ color: "#13f043", fontSize: 15 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={active}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
              setActive(!active);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        </Modal>
      </View>
      <View style={styles.text}></View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.gettik}
          onPress={() => navigation.navigate("FoundTrips" , enteredData)}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Поехали</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    padding: 10,
  },
  inputs: {
    gap: 12,
  },
  textInput: {
    backgroundColor: "#d9d9d9",
    padding: 12,
    borderRadius: 7,
  },
  date: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
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
  text: {},
  btnView: {
    paddingTop: 30,
  },
  gettik: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#13f043",
  },
});
