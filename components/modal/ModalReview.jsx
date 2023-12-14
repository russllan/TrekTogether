import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
// import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/slices/reviewSlice";

const styleGlobal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalReview({ open, setOpen, userId, driverId }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRatingChange = (e) => {
    const newRating = parseInt(e, 10);
    setRating(newRating);
  };

  const onSubmit = async () => {
    const data = {
      rating: rating,
      comment: comment,
      userId: userId,
      driverId: driverId,
    };
    await dispatch(addReview(data));
    setOpen(false);
  };

  return (
    <View style={styles.FormReview}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={styleGlobal}> */}
        <View>
          <Text style={{ paddingRight: 30 }}>Рейтинг:</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={5}
            onChangeText={(e) => handleRatingChange(e)}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <TextInput
            placeholder="Введите отзыв *необязательное поле"
            style={styles.inputReview}
            onChangeText={(e) => setComment(e)}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text>Оставить отзыв</Text>
          </TouchableOpacity>
        </View>
        {/* </Box> */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  FormReview: {},
  btn: {
    padding: "10 30",
    backgroundColor: "#fa4c43",
    color: "white",
    marginTop: "30",
  },
  inputReview: {
    width: 300,
    border: "1px solid silver",
    padding: "8 20",
    borderRadius: 10,
  },
});
