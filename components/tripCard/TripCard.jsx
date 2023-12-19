import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { gStyles } from "../../assets/global styles/styles";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function TripCard({ data, isTrip, userId }) {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reviewChange = () => {
    console.log(data.driver.id);
    setOpen(!open);
  };

  const onButton = () => {
    const props = {
      data: data,
      isTrip: isTrip,
      userId: userId,
    }
    navigation.navigate("Detail", props)
  };

  return (
    <View style={styles.viewTrip}>
      <View style={styles.viewWrapper}>
        <View style={styles.viewTop}>
          <View>
            <Text style={gStyles.textOpacity}>Точка старта:</Text>
            <Text style={styles.h1}>
              {isTrip ? data.trip.departureCity : data.departureCity}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/24/right.png")}
              style={{ width: 15 }}
            />
          </View>
          <View>
            <Text style={gStyles.textOpacity}>Конечная точка: </Text>
            <Text style={styles.h1}>
              {isTrip ? data.trip.arrivalCity : data.arrivalCity}
            </Text>
          </View>
        </View>
        <View style={styles.viewMiddle}>
          <View>
            <Text style={gStyles.textOpacity}>Водитель: </Text>
            <Text style={gStyles.h2}>{isTrip ? data.driver.name : data.driverName}</Text>
          </View>
          <View>
            <Text style={gStyles.textOpacity}>Машина:</Text>
            <Text style={gStyles.h2}>{isTrip ? data.car.name : data.carName}</Text>
          </View>
          <View>
            <Text style={gStyles.textOpacity}>Стоимость:</Text>
            <Text style={gStyles.h2}>{isTrip ? data.trip.price : data.price}</Text>
          </View>
          {/* {isCompleteTrip ? null : (
              <TouchableOpacity onPress={reviewChange}>
                <Image
                  source={require("../../assets/rating.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            )}
            {open ? (
              <View style={styles.modalReview}>
                <ModalReview
                  open={open}
                  setOpen={setOpen}
                  userId={userId}
                  driverId={data.driver.id}
                />
              </View>
            ) : null} */}
        </View>
        <View style={styles.viewBottom}>
          <View>
            <Text style={gStyles.textOpacity}>Свободные места:</Text>
            <Text style={gStyles.h2}>
              {isTrip ? data.trip.availableSeats : data.availableSeats}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.arrowBtn} onPress={onButton}>
              <Image
                source={require("../../assets/24/arrow.png")}
                style={{ width: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTrip: {
    width: 350,
    height: 210,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 5,
  },
  viewWrapper: {
    padding: 20,
    flexDirection: "column",
    gap: 25,
  },
  viewLeft: {
    width: "40%",
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: "#d9d9d9",
    margin: 10,
  },
  viewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewMiddle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  viewBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
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
  arrowBtn: {
    backgroundColor: "#004F39",
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontSize: 20,
    fontWeight: "700",
  },
  modalReview: {
    flex: 1,
  },
});
