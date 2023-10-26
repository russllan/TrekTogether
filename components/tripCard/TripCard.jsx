import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TripCard({ data }) {
  const navigation = useNavigation();

  return (
    // <TouchableOpacity onPress={() => navigation.navigate("book", props)}>
      <View style={styles.viewTrip}>
        <View style={styles.viewWrapper}>
          <View style={styles.viewLeft}>
            <View style={styles.viewTop}>
              <Text>{data.departureData}</Text>
              {/* <Text>{props.time}</Text> */}
              <Text>{data.departureCity}</Text>
            </View>
            <View style={styles.viewBottom}>
              {/* <Text>{props.arrivalDate}</Text> */}
              {/* <Text>{props.timeArrival}</Text> */}
              <Text>{data.arrivalCity}</Text>
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
                  {data.driverName}
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
                  {data.carName}
                </Text>
              </View>
            </View>
            <View style={styles.viewRightBottom}>
              <Text>Свободные места: {data.availableSeats}</Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#13f043",
                  borderBottomColor: "#d9d9d9",
                  borderBottomWidth: 1,
                }}
              >
                {data.price} сом
              </Text>
            </View>
          </View>
        </View>
      </View>
    // </TouchableOpacity>
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
  },
});
