import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Absence from "../../components/absence/Absence";

export default TripsPage = () => {
  const [active, setActive] = useState(true);

  return (
    <View style={styles.trip}>
      <TouchableOpacity
        onPress={() => setActive(true)}
        style={active ? styles.activeTrip : styles.active}
      >
        <Text style={styles.text}>Активные</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(false)}
        style={active ? styles.arhiv : styles.activeTrip}
      >
        <Text style={styles.text}>Архив</Text>
      </TouchableOpacity>
      <View style={styles.wrapperAbense}>
        {active ? (
          <View style={styles.abense}>
            <Absence title={"У вас нет активных поездок"} />
          </View>
        ) : (
          <View style={styles.abense}>
            <Absence title={"Вы ещё не совершали поездки в нашем сервисе"} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute"
  },
  active: {
    width: "50%",
    height: "100%",
  },
  arhiv: {
    width: "50%",
    height: "100%",
  },
  activeTrip: {
    width: "50%",
    height: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "green",
  },
  text: {
    alignSelf: "center",
    paddingTop: 15,
  },
  wrapperAbense: {
    width: "100%",
    position: "absolute",
    top: 220,
  },
  abense: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

});
