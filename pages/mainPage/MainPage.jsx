import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Form from "../../components/form/Form";

export default MainPage = () => {
  return (
    <View style={styles.main}>
      <Form />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
