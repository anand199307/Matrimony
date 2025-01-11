import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Text from "../common/GlobalText";
import colors from "../../configurations/config/color.config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/tabs/Home";

interface box {
  startColor?: string;
  endColor?: string;
  quickActionNumber?: any;
  quickActionText?: string;
}
// DetailsScreen
const QuickActionBox = ({
  startColor,
  endColor,
  quickActionText,
  quickActionNumber,
}: box) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Activity")}>
      <LinearGradient
        colors={[`${startColor}`, `${endColor}`]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.boxContainer}
      >
        <Text style={styles.title}>{quickActionText}</Text>
        <Text style={styles.number}>{quickActionNumber}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default QuickActionBox;

const styles = StyleSheet.create({
  boxContainer: {
    width: 130,
    height: 72,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 3,
    color: colors.WHITE_TEXT,
  },
  number: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 5,
    color: colors.WHITE_TEXT,
  },
});
