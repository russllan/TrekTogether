import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addReview } from "../../store/slices/reviewSlice";
import { gStyles } from "../../assets/global styles/styles";

export default function ModalReview({ open, onClose, userId, driverId }) {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleRatingChange = (e) => {
    const newRating = parseInt(e, 10);
    setRating(newRating);
  };

  const onSubmit = async () => {
    if (rating >= 1 && rating <= 5) {
      const data = {
        rating: rating,
        comment: comment,
        userId: userId,
        driverId: driverId,
      };
      await dispatch(addReview(data)).then(() => {
        Alert.alert("Отзыв отправлен");
        onClose(false);
      });
    } else {
      Alert.alert("Вы можете поставить рейтинг только от 1 до 5");
      setComment("");
    }
  };

  return (
    <Modal isVisible={open} style={styles.modal}>
      <View style={styles.modalContent}>
        <View>
          <Text style={styles.text}>Отзыв</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            placeholder="Введите рейтинг"
            style={styles.input}
            value={rating}
            onChangeText={(e) => handleRatingChange(e)}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <TextInput
            placeholder="Введите отзыв *необязательное поле"
            style={styles.textInput}
            value={comment}
            onChangeText={(e) => setComment(e)}
          />
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={gStyles.btn} onPress={onSubmit}>
            <Text style={gStyles.text}>Отправить отзыв</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={gStyles.btnRed}
            onPress={() => onClose(false)}
          >
            <Text style={gStyles.text}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 310,
    height: 344,
    borderRadius: 5,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 45,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#00000080",
    backgroundColor: "#F3F3F3",
  },
  textInput: {
    width: "100%",
    padding: 10,
    height: 110,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#00000080",
    backgroundColor: "#F3F3F3",
    marginBottom: 30,
  },
  text: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 16,
  },
  viewBtn: {
    width: "100%",
    gap: 30,
  },
});
