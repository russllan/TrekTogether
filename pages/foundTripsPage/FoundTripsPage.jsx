import React, { useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TripCard from "../../components/tripCard/TripCard";
import { useDispatch, useSelector } from "react-redux";
import { trip } from "../../store/slices/tripSlice";

export default function FoundTrips({ route }) {
  const enteredData = route.params;
  const { startPoint, endPoint, date, passengers } = enteredData;
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(trip(enteredData));
  }, [])

  // const filteredTrips = useMemo(() => {
  //   return result?.filter((item) => {
  //     return (
  //       item.departureCity === startPoint &&
  //       item.arrivalCity === endPoint &&
  //       item.departureData === date &&
  //       item.availableSeats >= passengers
  //     );
  //   });
  // }, [startPoint, endPoint, date, passengers]);

  const renderCards = useMemo(
    () =>
    result?.map((item) => (
        <View key={item.id}>
          <TripCard data={item} />
        </View>
      )),
    [result]
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
