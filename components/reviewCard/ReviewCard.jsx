import { View, Text, StyleSheet } from "react-native";
import { gStyles } from "../../assets/global styles/styles";

export default ReviewCard = ({ name, comment, rating }) => {
  return (
    <View style={styles.ReviewCard}>
      <View style={styles.wrapper}>
        <View style={styles.top}>
          <View style={styles.left}>
            <Text style={gStyles.text}>Пассажир: </Text>
            <Text style={{ fontSize: 20 }}>{name}</Text>
          </View>
          <View style={styles.right}>
            <Text style={gStyles.text}>Рейтинг: </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>{rating} / 5</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.viewComment}>
            <Text style={gStyles.text}>Комментарий: </Text>
            <Text>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ReviewCard: {
    width: 310,
    height: 152,
    borderRadius: 5,
    backgroundColor: "#ffff",
  },
  wrapper: {
    padding: 20,
  },
  top: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    opacity: 0.5,
    color: "#01010180",
  },
});
