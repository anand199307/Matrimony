import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Text from "./GlobalText";
import color from "../../configurations/config/color.config";

interface button {
  title?: string;
  MV?: number;
  onPressFunc?: () => void;
  Height?: number;
  setFontSize?: number;
}

const SecondaryButton = ({
  title,
  MV,
  onPressFunc,
  Height,
  setFontSize,
}: button) => {
  return (
    <TouchableOpacity
      onPress={onPressFunc}
      style={[
        styles.button,
        {
          marginVertical: MV,
          height: Height ? Height : 50,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          { fontSize: setFontSize ? setFontSize : 18 },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: color.PRIMARY_COLOR,
    borderRadius: 8,
    // height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ED1F50",
  },
  buttonText: {
    color: color.SECONDARY_COLOR,
    textAlign: "center",
    fontWeight: "400",
    // fontSize: 18,
  },
});
