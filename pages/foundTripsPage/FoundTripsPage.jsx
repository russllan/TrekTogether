import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { data } from "../../constants/dataTrips";
import TripCard from "../../components/tripCard/TripCard";

export default function FoundTrips({ route }) {
  const enteredData = route.params;
  const { startPoint, endPoint, date, passengers } = enteredData;

  const filteredTrips = useMemo(() => {
    return data?.filter((item) => {
      return (
        item.destination === startPoint &&
        item.arrival === endPoint &&
        item.selected === date &&
        item.amount >= passengers
      );
    });
  }, [startPoint, endPoint, date, passengers]);

  const renderCards = useMemo(
    () =>
      filteredTrips?.map((item) => (
        <View key={item.model}>
          <TripCard props={item} />
        </View>
      )),
    [filteredTrips]
  );

  return <View style={styles.viewMain}>{renderCards}</View>;
}

const styles = StyleSheet.create({
  viewMain: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
});
