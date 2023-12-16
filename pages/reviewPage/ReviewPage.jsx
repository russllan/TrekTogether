import { View, Text, StyleSheet } from "react-native";
import { gStyles } from "../../assets/global styles/styles";
import { useMemo } from "react";
import ReviewCard from "../../components/reviewCard/ReviewCard";

export default ReviewPage = ({ route }) => {
  const result = route.params;
  console.log(result?.flat());

  const renderReviewCard = useMemo(() => {
    return (
      <>
        {result?.map((innerArray, outerIndex) => (
          innerArray.map((item, innerIndex) => (
            <ReviewCard
              key={`${outerIndex}-${innerIndex}`}
              name={item.userName}
              rating={item.rating}
              comment={item.comment}
            />
          ))
        ))}
      </>
    );
  }, [result]);

  return (
    <View style={styles.ReviewPage}>
      <View style={styles.wrapper}>
        <Text style={gStyles.wrapperText}>Мои отзывы</Text>
        {renderReviewCard}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ReviewPage: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
    gap: 25,
  },
});
