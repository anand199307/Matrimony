import { StyleProp, ViewStyle, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../common/GlobalText";
import color from "../../configurations/config/color.config";

interface content {
  contentBold: any;
  contentSmall: any;
}

const WelcomeContent = ({ contentBold, contentSmall }: content) => {
  return (
    <>
      {contentBold?.map((item: string, ind: any) => (
        <Text style={styles.boldText} key={ind}>
          {item}
        </Text>
      ))}
      <View style={styles.smallContent}>
        {contentSmall?.map((item: string, ind: any) => (
          <Text style={styles.lightText} key={ind}>
            {item}
          </Text>
        ))}
      </View>
    </>
  );
};
export default WelcomeContent;

const styles = StyleSheet.create({
  boldText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: color.P_TEXT,
  },
  lightText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: "#BABABA",
  },
  smallContent: {
    marginTop: 20,
  },
});
