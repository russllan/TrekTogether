import React from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "../components/carousel/Carousel";
import { data } from "../constants/info";

export default LandingPage = ({ navigation }) => {

  return (
    <View style={styles.view}>
      <Carousel data={data} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
    }
})