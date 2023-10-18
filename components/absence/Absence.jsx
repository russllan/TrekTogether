import { View, StyleSheet, Text, Image } from "react-native";

export default Absence = ({ title }) => {
  return (
    <View style={styles.absence}>
      <View style={{ width: "100%", height: 210 }}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=720&q=60",
          }}
          width={290}
          height={200}
          borderRadius={10}
          blurRadius={0.8}
        />
      </View>
      <View style={{ width: "100%", height: 80 }}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    absence: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        textAlign: "center"
    }
});
