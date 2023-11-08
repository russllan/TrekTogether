import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import TripCard from "../../components/tripCard/TripCard";
import { useDispatch, useSelector } from "react-redux";
import { trip } from "../../store/slices/tripSlice";
// import { data } from "../../constants/dataTrips";

export default function FoundTrips({ route }) {
  const enteredData = route.params;
  const dispatch = useDispatch();
  const result = useSelector((state) => state.trip.Trip.result);
  const isLoading = useSelector((state) => state.trip.Trip.isLoading);

  useEffect(() => {
    dispatch(trip(enteredData));
  }, []);

  return (
    <View style={styles.viewMain}>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : (
        result?.map((item) => (
          <View>
            <TripCard data={item} />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
  },
});
