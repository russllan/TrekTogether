import { StyleSheet } from "react-native";

export const gStyles = StyleSheet.create({
  Info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  wrapperImg: {
    borderRadius: 10,
  },
  wrapperTitle: {
    fontSize: 100,
  },
  wrapperText: {
    width: 394,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 7,
  },
  text: {
    width: 300,
    fontFamily: "Roboto",
    textAlign: "center"
  },
  textInput: {
    backgroundColor: "#d9d9d9",
    padding: 12,
    borderRadius: 7,
  },
  btn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#13f043",
  },
});
