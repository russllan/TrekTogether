import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { gStyles } from "../../assets/global styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  bookTrip,
  deleteTrip,
  deleteUserTrip,
} from "../../store/slices/tripSlice";
import { GetUserID } from "../../App";
import { useNavigation } from "@react-navigation/native";

export default function TripCard({ data, isTrip }) {
  const navigation = useNavigation();
  const { isDriver } = useSelector((state) => state.trip.AddTrip);

  const dispatch = useDispatch();

  const onSubmit = async () => {
    const id = await GetUserID();
    const bookData = {
      userId: id,
      tripId: data.id,
    };
    await dispatch(bookTrip(bookData));
    navigation.navigate("Main");
  };

  const onDelete = async () => {
    const id = await GetUserID();
    isDriver
      ? dispatch(deleteTrip(data.trip.id))
      : dispatch(deleteUserTrip(id, data.trip.id));
  };

  return (
    <View style={styles.viewTrip}>
      <View style={styles.viewWrapper}>
        <View style={styles.viewLeft}>
          <View style={styles.viewTop}>
            <Text>{isTrip ? data.trip.departureData : data.departureData}</Text>
            {/* <Text>{props.time}</Text> */}
            <Text>{isTrip ? data.trip.departureCity : data.departureCity}</Text>
          </View>
          <View style={styles.viewBottom}>
            {/* <Text>{props.arrivalDate}</Text> */}
            {/* <Text>{props.timeArrival}</Text> */}
            <Text>{isTrip ? data.trip.arrivalCity : data.arrivalCity}</Text>
          </View>
        </View>
        <View style={styles.viewRight}>
          <View style={styles.viewRightTop}>
            <View style={{ flexDirection: "row" }}>
              {/* <Image
                  source={{ uri: data.driverImg }}
                  width={45}
                  height={45}
                  borderRadius={30}
                /> */}
              <Text
                style={{
                  width: 75,
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {isTrip ? data.driver.name : data.driverName}
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 7 }}>
              {/* <Image
                  source={{ uri: props.carImg }}
                  width={45}
                  height={45}
                  borderRadius={30}
                /> */}
              <Text
                style={{
                  width: 75,
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                {isTrip ? data.car.name : data.carName}
              </Text>
            </View>
          </View>
          <View style={styles.viewRightBottom}>
            <Text>
              Свободные места:{" "}
              {isTrip ? data.trip.availableSeats : data.availableSeats}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "#13f043",
                borderBottomColor: "#d9d9d9",
                borderBottomWidth: 1,
              }}
            >
              {isTrip ? data.trip.price : data.price} сом
            </Text>
          </View>
          {isTrip ? (
            <TouchableOpacity onPress={onDelete} style={styles.btn}>
              <Text>Отменить бронь</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onSubmit} style={gStyles.btn}>
              <Text>Забронировать</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTrip: {
    width: 340,
    height: 200,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
  },
  viewWrapper: {
    padding: 20,
    flexDirection: "row",
  },
  viewLeft: {
    width: "40%",
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: "#d9d9d9",
    margin: 10,
  },
  viewTop: {
    flexDirection: "column",
    paddingBottom: 20,
  },
  viewBottom: {
    flexDirection: "column",
  },
  viewRight: {
    width: "49%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  viewRightTop: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  viewRightBottom: {
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 5,
    paddingBottom: 10,
  },
  btn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#8B0000",
  },
});
