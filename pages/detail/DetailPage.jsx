import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { gStyles } from "../../assets/global styles/styles";
import { useEffect, useState } from "react";
import {
  bookTrip,
  completeTrip,
  deleteTrip,
  deleteUserTrip,
} from "../../store/slices/tripSlice";

export default DetailPage = ({ route }) => {
  const { data } = route.params;
  const { isTrip } = route.params;
  const { userId } = route.params;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(data);
  console.log(isTrip);
  console.log(userId);

  useEffect(() => {
    const departureData = isTrip ? data.trip.departureData : data.departureData;
    const dateObject = new Date(departureData);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }, []);

  const onSubmit = async () => {
    const bookData = {
      userId: userId,
      tripId: data.id || data.trip.id,
    };
    await dispatch(bookTrip(bookData));
    navigation.navigate("Main");
  };

  const onDelete = async () => {
    const tripId = isTrip ? data.trip.id : data.id;

    userId === data.driver.id
      ? dispatch(deleteTrip(tripId))
      : dispatch(deleteUserTrip({ id, tripId }));
    navigation.navigate("Поездки");
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
            navigation.navigate("Поездки");
          },
        },
        {
          text: "Отмена",
        },
      ],
      { cancelable: false }
    );
  };

  // const reviewChange = () => {
  //   console.log(data.driver.id);
  //   setOpen(!open);
  // };

  return (
    <View style={styles.DetailPage}>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.wrapCard}>
            <View style={styles.column}>
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
            <View style={styles.column}>
              <View>
                <Text style={gStyles.textOpacity}>Водитель: </Text>
                <Text style={gStyles.h2}>
                  {isTrip ? data.driver.name : data.driverName}
                </Text>
              </View>
              <View>
                <Text style={styles.textOpacity}>Телефон: </Text>
                <Text style={gStyles.h2}>
                  {isTrip ? data.driver.phoneNumber : data.driverPhoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.column}>
              <View>
                <Text style={gStyles.textOpacity}>Рейтинг:</Text>
                <Text style={gStyles.h2}>
                  {isTrip ? data.car.rating : data.driverRating}
                </Text>
              </View>
              <View>
                <Text style={gStyles.textOpacity}>Машина:</Text>
                <Text style={gStyles.h2}>
                  {isTrip ? data.car.name : data.carName}
                </Text>
              </View>
            </View>
            <View style={styles.column}>
              <View>
                <Text style={gStyles.textOpacity}>Свободные места:</Text>
                <Text style={gStyles.h2}>
                  {isTrip ? data.trip.availableSeats : data.availableSeats}
                </Text>
              </View>
              <View>
                <Text style={gStyles.textOpacity}>Год выпуска машины:</Text>
                <Text style={styles.h2}>
                  {isTrip ? data.car.carYear : data.carYear}
                </Text>
              </View>
            </View>
            <View style={styles.column}>
              <View>
                <Text>Дата отправления:</Text>
              </View>
              <View>
                <Text style={gStyles.h2}>{date}</Text>
              </View>
            </View>
          </View>
        </View>
        {""}
        <View style={styles.viewBtn}>
          {isTrip ? (
            data.trip.isCompleted && userId !== data.driver.id ? (
              <TouchableOpacity style={gStyles.btnGreen}>
                <Text style={gStyles.text}>Оставить отзыв</Text>
              </TouchableOpacity>
            ) : data.trip.isCompleted === false && userId === data.driver.id ? (
              <>
                <TouchableOpacity style={gStyles.btnRed} onPress={onDelete}>
                  <Text style={gStyles.text}>Отменить поездку</Text>
                </TouchableOpacity>
                <TouchableOpacity style={gStyles.btnGreen} onPress={onComplete}>
                  <Text style={gStyles.text}>Завершить поездку</Text>
                </TouchableOpacity>
              </>
            ) : data.trip.isCompleted && userId !== data.driver.id ? (
              <TouchableOpacity style={gStyles.btnRed} onPress={onDelete}>
                <Text style={gStyles.text}>Отменить бронь</Text>
              </TouchableOpacity>
            ) : null
          ) : userId !== data.driverId ? (
            <TouchableOpacity style={gStyles.btnGreen} onPress={onSubmit}>
              <Text style={gStyles.text}>Забронировать</Text>
            </TouchableOpacity>
          ) : userId === data.driverId ? (
            <TouchableOpacity style={gStyles.btnRed} onPress={onDelete}>
              <Text style={gStyles.text}>Отменить поездку</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {""}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DetailPage: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
    paddingTop: 30,
  },
  card: {
    width: 350,
    height: 348,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  wrapCard: {
    padding: 25,
    gap: 25,
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: {
    fontSize: 20,
  },
  h2: {
    fontSize: 16,
    textAlign: "right",
  },
  textOpacity: {
    fontSize: 13,
    opacity: 0.5,
    color: "#01010180",
    textAlign: "right",
  },
  viewBtn: {
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
});
