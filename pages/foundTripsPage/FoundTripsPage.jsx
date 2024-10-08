import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import TripCard from "../../components/tripCard/TripCard";
import { useDispatch, useSelector } from "react-redux";
import { trip } from "../../store/slices/tripSlice";
import { useState } from "react";
import { GetUserID } from "../../App";

export default function FoundTrips({ route }) {
  const [userID, setUserID] = useState();
  const enteredData = route.params;
  const dispatch = useDispatch();
  const result = useSelector((state) => state.trip.Trip.result);
  const isLoading = useSelector((state) => state.trip.Trip.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await GetUserID();
        setUserID(id);
        dispatch(trip(enteredData)); // вызов после получения userID
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.viewMain}>
      {isLoading ? (
        <Text>...Loading</Text>
      ) : (
        result?.map((item) => (
          <View>
            <TripCard isTrip={false} data={item} userId={userID} />
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
