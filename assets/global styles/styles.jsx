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
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 7,
  },
  text: {
    width: "100%",
    fontFamily: "Roboto",
    color: "#ffff",
    textAlign: "center",
  },
  textOpacity: {
    fontSize: 13,
    opacity: 0.5,
    color: "#01010180",
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 16,
  },
  textInput: {
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderBlockColor: "1px solid #00000080",
  },
  btn: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#3B4340",
  },
  btnGreen: {
    width: 300,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#004F39",
  },
  btnRed: {
    width: 300,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#96273B",
  },
});
