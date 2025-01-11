import { StyleSheet, View, Image } from "react-native";
import React from "react";
import Text from "../../components/common/GlobalText";
import colors from "../../configurations/config/color.config";

const CardHeading = ({ src, Title }: any) => {
  return (
    <View style={styles.cardHeading}>
      <Image source={src} style={styles.logoHeading} resizeMode="center" />
      <Text style={styles.heading}>{Title}</Text>
    </View>
  );
};

export default CardHeading;

const styles = StyleSheet.create({
  cardHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  logoHeading: {
    width: 45,
    height: 45,
  },
  heading: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.P_TEXT,
    textTransform: "capitalize",
    fontStyle: "italic",
    marginLeft: 10,
  },
});
