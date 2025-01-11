import { StyleSheet, View, Image } from "react-native";
import React from "react";
import Text from "../common/GlobalText";
import { miniIcon } from "../../utilis/staticData/Profile";

const ProfileMiniIcon = ({ text1, text2, standard }: miniIcon) => {
  return (
    <View style={styles.iconsContainer}>
      <Image source={standard} style={styles.miniIcon} />
      <Text style={styles.miniText}>{text1}</Text>
      <Text style={styles.miniText}>{text2}</Text>
    </View>
  );
};

export default ProfileMiniIcon;

const styles = StyleSheet.create({
  miniIcon: {
    width: 25,
    height: 25,
    marginBottom: 3,
  },
  miniText: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    color: "#535353",
  },
  iconsContainer: {
    width: 45,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
