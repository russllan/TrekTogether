import { Text, View, Image } from "react-native";
import { gStyles } from "../../assets/global styles/styles";

export default Info = ({ data }) => {
  return (
    <View style={gStyles.Info}>
      <View style={gStyles.wrapperImg}>
        <Image source={{ uri: data.img }} width={300} height={280} borderRadius={15} />
      </View>
      <View style={gStyles.wrapperTitle}><Text style={{fontSize: 18}}>{data.title}</Text></View>
      <View style={gStyles.wrapperText}>
        <Text style={gStyles.text}>{data.text}</Text>
        <Text style={gStyles.text}>{data.text2}</Text>
        <Text style={gStyles.text}>{data.text3}</Text>
        {/* {data.additionally ? <Text>{data.additionally}</Text> : null} */}
        {data.note ? <Text style={{width: 300}}>{data.note}</Text> : null}
      </View>
    </View>
  );
};
