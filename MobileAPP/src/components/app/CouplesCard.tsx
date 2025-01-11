import { StyleSheet, View, Image } from "react-native";
import React from "react";
import Text from "../common/GlobalText";
import colors from "../../configurations/config/color.config";
import { IMAGES } from "../../assets/Images/index";
import { WIDTH } from "../../configurations/config/app.config";
interface couplePairItem {
  content?: string;
  src?: any;
  navFunc?: (value: any) => void;
}

const CouplesCard = ({ content, src, navFunc }: couplePairItem) => {
  return (
    <View style={styles.container}>
      <Image source={src} style={styles.imageBG} />
      <View style={styles.content}>
        <Text style={styles.cardDescription} numberOfLines={5}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default CouplesCard;

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  imageBG: {
    width: "100%",
    height: 170,
    borderRadius: 10,
  },
  cardDescription: {
    fontSize: 10,
    fontWeight: "400",
    color: colors.P_TEXT,
    lineHeight: 15,
  },
  content: {
    padding: 15,
  },
});
