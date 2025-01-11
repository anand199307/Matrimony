import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import Text from "../../components/common/GlobalText";
import colors from "../../configurations/config/color.config";
import Button from "../../components/common/Button";

const CouponCode = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.modalHeading}>Have coupon code?</Text>
      <TextInput
        placeholder="Coupon Code"
        value={""}
        onChangeText={() => {
          console.log();
        }}
        style={styles.testBox}
      />
      <View style={{ width: "80%" }}>
        <Button title="Apply" MV={0} />
      </View>
    </View>
  );
};

export default CouponCode;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 350,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.SECONDARY_COLOR,
    letterSpacing: 0.1,
    textTransform: "capitalize",
  },
  testBox: {
    borderWidth: 1,
    borderColor: colors.BORDER_FORM,
    marginVertical: 35,
    borderRadius: 5,
    width: 180,
    height: 60,
    padding: 5,
    textAlign: "center",
  },
});
