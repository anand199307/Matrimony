import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../../../configurations/config/color.config";
import Text from "../../../components/common/GlobalText";
import Header from "../../../components/app/ProfileHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/tabs/Home";
import Content from "../../../components/app/ManageAccountPageContent";

const HelpCenter = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [form, setForm] = useState<any>({});

  const navFunc = () => navigation.navigate("Settings");
  return (
    <View style={styles.container}>
      <Header title="Help Centre" navFunc={navFunc} />
      <View style={styles.body}>
        <Content
          title="Safe Matrimony"
          content="Safe matrimony is our vision and provide you a safe online services.Contact our assistance team immediately, if you need any help from us."
        />
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Call us"
            value={form.password}
            onChangeText={(password) =>
              setForm({ ...form, password, passwordError: "" })
            }
            style={styles.testBox}
          />
          <TextInput
            placeholder="Write to us"
            value={form.password}
            onChangeText={(password) =>
              setForm({ ...form, password, passwordError: "" })
            }
            style={styles.testBox}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate("Preferences")}>
            <Text
              style={[styles.greyContent, { color: colors.SECONDARY_COLOR }]}
            >
              Click here
            </Text>
          </TouchableOpacity>
          <Text style={styles.greyContent}>to view our privacy policy</Text>
        </View>
      </View>
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  feildBox: {
    marginTop: 25,
  },
  content: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.P_TEXT,
    letterSpacing: 0.2,
    lineHeight: 25,
  },
  testBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER_FORM,
    marginVertical: 5,
  },
  textInputContainer: {
    marginVertical: 20,
  },
  greyContent: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.S_TEXT,
    lineHeight: 20,
    marginLeft: 5,
  },
});
