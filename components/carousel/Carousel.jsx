import React, { useRef, useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import Info from "../info/Info";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 1;

export default Slider = ({ data, navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  const [num, setNum] = useState(1);

  const handleSwipePress = () => {
    if (num === 5) {
      navigation.navigate("Main");
    } else {
      // Вычисляем индекс следующего слайда и прокручиваем к нему
      const nextIndex = Math.floor(scrollX._value / ITEM_WIDTH) + num;
      const offset = nextIndex * ITEM_WIDTH;
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
      setNum(num + 1);
    }
  };

  const renderSlide = useMemo(() => 
    data.map((item) => (
      <Info data={item} />
    )), [data])

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {renderSlide}
      </ScrollView>
      <TouchableOpacity onPress={handleSwipePress} style={styles.button}>
        <Text style={{color: "#fff"}}>Далее</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  button: {
    width: 270,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "green",
    marginBottom: 20,
  },
});
