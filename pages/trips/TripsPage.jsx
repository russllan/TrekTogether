import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
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
            <TripCard
              key={item.id}
              isTrip={true}
              data={item}
              userId={userID}
            />
          );
        }),
    [result]
  );

  const renderIdArchive = useMemo(() => {
    return result
      ?.filter((item) => item.trip.isCompleted === true)
      .map((item) => (
        <TripCard key={item.id} isTrip={true} data={item} userId={userID} />
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
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity style={gStyles.btn} onPress={() => getMyTrips()}>
            <Text>Обновить</Text>
          </TouchableOpacity>
        </View>
        {active ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.abense}>
              {result ? (
                renderActiveCard
              ) : (
                <Absence title={"У вас нет активных поездок"} />
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.abense}>
            {idArchive ? (
              renderIdArchive
            ) : (
              <Absence title={"Вы ещё не совершали поездки в нашем сервисе"} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    width: "50%",
    height: "100%",
  },
  arhiv: {
    width: "50%",
    height: "100%",
  },
  activeTrip: {
    width: "50%",
    height: "100%",
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
    top: 100,
  },
  abense: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
