import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../components/common/GlobalText";
import colors from "../../configurations/config/color.config";

const PrivacyContent = ({ item }: any) => {
  return (
    <View key={item?.id}>
      <Text style={styles.contentHeading}>{item?.heading}</Text>
      <Text style={styles.content}>{item?.content}</Text>
      {item?.content2 && <Text style={styles.content}>{item?.content2}</Text>}
      {item?.contentList?.map((list: any) => (
        <View key={list?.id} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.listContent}>{list?.list}</Text>
        </View>
      ))}
    </View>
  );
};

export default PrivacyContent;

const styles = StyleSheet.create({
  contentHeading: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: colors.P_TEXT,
    marginTop: 10,
  },
  content: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.S_TEXT,
    letterSpacing: 0.4,
    textAlign: "justify",
    marginVertical: 10,
  },
  listContent: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.S_TEXT,
    letterSpacing: 0.4,
    textAlign: "justify",
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: colors.S_TEXT,
    borderRadius: 50,
    margin: 7,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
});
