import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { gStyles } from "../../assets/global styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  bookTrip,
  completeTrip,
  deleteTrip,
  deleteUserTrip,
} from "../../store/slices/tripSlice";
import { GetUserID } from "../../App";
import { useNavigation } from "@react-navigation/native";
import ModalReview from "../modal/ModalReview";

export default function TripCard({ data, isTrip, userId }) {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isDriver } = useSelector((state) => state.trip.AddTrip);
  const isCompleteTrip = useSelector(
    (state) => state.trip.completeTrip.isError
  );

  const onSubmit = async () => {
    const id = await GetUserID();
    const bookData = {
      userId: id,
      tripId: data.id || data.trip.id,
    };
    await dispatch(bookTrip(bookData));
    navigation.navigate("Main");
  };

  const onDelete = async () => {
    const id = await GetUserID();
    const tripId = data.trip ? data.trip.id : data.id;

    id === data.driver.id
      ? dispatch(deleteTrip(tripId))
      : dispatch(deleteUserTrip({ id, tripId }));
  };

  const onComplete = () => {
    Alert.alert(
      "Подтверждение",
      "Вы уверены, что хотите завершить поездку?",
      [
        {
          text: "Да",
          style: "cancel",
          onPress: () => {
            const res = data.trip ? data.trip.id : data.id;
            dispatch(completeTrip(res));
          },
        },
        {
          text: "Отмена",
        },
      ],
      { cancelable: false }
    );
  };

  const reviewChange = () => {
    console.log(data.driver.id);
    setOpen(!open);
  };

  return (
    <View style={styles.viewTrip}>
      <View style={styles.viewWrapper}>
        <View style={styles.viewLeft}>
          <View style={styles.viewTop}>
            <Text style={gStyles.textOpacity}>Точка старта:</Text>
            <Text>{isTrip ? data.trip.departureData : data.departureData}</Text>
            <Text>{isTrip ? data.trip.departureCity : data.departureCity}</Text>
          </View>
          <View style={styles.viewBottom}>
            <Text>{isTrip ? data.trip.arrivalCity : data.arrivalCity}</Text>
            {isCompleteTrip ? null : (
              <TouchableOpacity onPress={reviewChange}>
                <Image
                  source={require("../../assets/rating.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )}
            {open ? <View style={styles.modalReview}><ModalReview open={open} setOpen={setOpen} userId={userId} driverId={data.driver.id} /></View> : null}
          </View>
        </View>
        <View style={styles.viewRight}>
          <View style={styles.viewRightTop}>
            <View style={{ flexDirection: "row" }}>
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
                <Text>awd</Text>
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
              Свободные места:
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
          <View style={styles.viewButtons}>
            {isTrip ? (
              <TouchableOpacity onPress={onDelete} style={styles.btn}>
                {userId === data.driver.id ? (
                  <Text>Отменить поездку</Text>
                ) : (
                  <Text>Отменить бронь</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onSubmit} style={gStyles.btn}>
                <Text>Забронировать</Text>
              </TouchableOpacity>
            )}
            {isDriver ? (
              <TouchableOpacity onPress={onComplete} style={styles.btn}>
                <Text>Завершить поездку</Text>
              </TouchableOpacity>
            ) : null}
          </View>
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
  viewButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    width: 80,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#8B0000",
  },
  modalReview: {
    flex: 1
  },
});
