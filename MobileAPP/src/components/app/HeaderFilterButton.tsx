import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../configurations/config/color.config";
import Text from "../common/GlobalText";

interface filter {
  activeId?: any;
  selectedBtn: (val: any) => void;
  item?: any;
}

const HeaderFilterButton = ({ item, activeId, selectedBtn }: filter) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        activeId === item?.id ? styles.activeBtn : styles.inActiveBtn,
      ]}
      onPress={() => selectedBtn(item)}
    >
      <Text
        style={[
          styles.text,
          activeId === item?.id ? styles.textActive : styles.textInActive,
        ]}
      >
        {item.img}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderFilterButton;

const styles = StyleSheet.create({
  btn: {
    width: "auto",
    height: 45,
    borderWidth: 1,
    borderColor: colors.PRIMARY_COLOR,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginHorizontal: 10,
    paddingHorizontal: 15,
  },
  inActiveBtn: {
    backgroundColor: colors.TRANSPARENT,
  },
  activeBtn: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
  },
  textActive: {
    color: colors.S_TEXT,
  },
  textInActive: {
    color: colors.WHITE_TEXT,
  },
});
