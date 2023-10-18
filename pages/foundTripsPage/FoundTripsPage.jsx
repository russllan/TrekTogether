import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { data } from "../../constants/dataTrips";
import TripCard from "../../components/tripCard/TripCard";

export default function FoundTrips({ route }) {
  const enteredData = route.params;
  const { startPoint, endPoint, date, passengers  } = enteredData;

  const renderCards = useMemo(
    () =>
    data?.map((item) => (
        <View key={item.model}>
          <TripCard props={item} />
          <Text>{endPoint}</Text>
          <Text>{date}</Text>
          <Text>{passengers}</Text>
        </View>
      )),
    [data]
  );

      console.log(startPoint);

  return <View style={styles.viewMain}>{renderCards}</View>;
}

const styles = StyleSheet.create({
  viewMain: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
});
