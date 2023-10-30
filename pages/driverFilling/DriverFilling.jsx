import { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
import { radioOptions } from "../../constants/radioOptions";

export default function DriverFilling() {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.viewMain}>
      <View style={styles.viewWrapper}>
        <Text>Какой у вас Автомобиль?</Text>
        <View style={styles.inputs}>
          <TextInput placeholder="Марка" />
          <TextInput placeholder="Модель" />
          <TextInput placeholder="Год выпуска" />
          <TextInput placeholder="Госномер" />
        </View>
        <View style={styles.viewOptions}>
            <Text>Выберите кол-во свободных мест</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
  },
});
