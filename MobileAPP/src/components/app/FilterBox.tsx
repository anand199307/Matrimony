import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Text from "../common/GlobalText";
import colors from "../../configurations/config/color.config";
import LinearGradient from "react-native-linear-gradient";
import { ICONS } from "../../assets/Icons";

interface box {
  startColor?: string;
  endColor?: string;
  src?: any;
  title?: string;
  selectedBox: (val: any) => void;
}

const FilterBox = ({ startColor, endColor, src, title, selectedBox }: box) => {
  return (
    <TouchableOpacity
      onPress={() => selectedBox(title)}
      style={styles.boxContainer}
    >
      <LinearGradient
        colors={[`${startColor}`, `${endColor}`]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Image source={src} style={styles.Icon} />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FilterBox;

const styles = StyleSheet.create({
  boxContainer: {
    width: "45%",
    height: 75,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 3,
    color: colors.WHITE_TEXT,
  },
  Icon: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  gradient: {
    width: "100%",
    height: 75,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
