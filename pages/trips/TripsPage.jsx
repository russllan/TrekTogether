import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useMemo, useState, useEffect } from "react";
import Absence from "../../components/absence/Absence";
import { useDispatch, useSelector } from "react-redux";
import TripCard from "../../components/tripCard/TripCard";
import { getTrip } from "../../store/slices/tripSlice";
import { GetUserID } from "../../App";
import { gStyles } from "../../assets/global styles/styles";

export default TripsPage = () => {
  const [active, setActive] = useState(true);
  const [userID, setUserID] = useState();

  const dispatch = useDispatch();

  const result = useSelector((state) => state.trip.GetTrip.result);
  const isLoading = useSelector((state) => state.trip.GetTrip.isLoading);
  const idArchive = useSelector((state) => state.trip.completeTrip.id);

  const getMyTrips = async () => {
    const res = await GetUserID();
    setUserID(res);
    dispatch(getTrip(res));
  };

  useEffect(() => {
    getMyTrips();
  }, []);

  const renderActiveCard = useMemo(
    () =>
      result
        ?.filter((item) => item.trip.isCompleted === false)
        .map((item) => {
          return (
            <View style={styles.viewCard}>
              <TripCard
                key={item.id}
                isTrip={true}
                data={item}
                userId={userID}
              />
            </View>
          );
        }),
    [result]
  );

  const renderIdArchive = useMemo(() => {
    return result
      ?.filter((item) => item.trip.isCompleted === true)
      .map((item) => (
        <View style={styles.viewCard}>
          <TripCard key={item.id} isTrip={true} data={item} userId={userID} />
        </View>
      ));
  }, [result]);

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.trip}>
      <TouchableOpacity
        onPress={() => setActive(true)}
        style={active ? styles.activeTrip : styles.active}
      >
        <Text style={styles.text}>Активные</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive(false)}
        style={active ? styles.arhiv : styles.activeTrip}
      >
        <Text style={styles.text}>Архив</Text>
      </TouchableOpacity>
      <View style={styles.wrapperAbense}>
        <View
          style={{ width: "100%", alignItems: "center", paddingBottom: 15 }}
        >
          <TouchableOpacity style={gStyles.btn} onPress={() => getMyTrips()}>
            <Text style={gStyles.text}>Обновить</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.abense}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {active ? (
              result ? (
                renderActiveCard
              ) : (
                <Absence title={"У вас нет активных поездок"} />
              )
            ) : idArchive ? (
              renderIdArchive
            ) : (
              <Absence title={"Вы ещё не совершали поездки в нашем сервисе"} />
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    width: "50%",
  },
  arhiv: {
    width: "50%",
  },
  activeTrip: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "green",
  },
  text: {
    alignSelf: "center",
    paddingTop: 15,
  },
  wrapperAbense: {
    width: "100%",
    position: "absolute",
    top: 60,
  },
  abense: {
    width: "100%",
    height: 600,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  viewCard: {
    width: "100%",
    height: 240,
    alignItems: "center",
  },
});
