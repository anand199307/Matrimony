import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../common/GlobalText";
import colors from "../../configurations/config/color.config";

const ManageAccountPageContent = ({ title, content }: any) => {
  return (
    <>
      <Text style={styles.primaryContent}>{title}</Text>
      <Text style={styles.greyContent}>{content}</Text>
    </>
  );
};

export default ManageAccountPageContent;

const styles = StyleSheet.create({
  primaryContent: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    color: colors.SECONDARY_COLOR,
  },
  greyContent: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.S_TEXT,
    lineHeight: 20,
  },
});
