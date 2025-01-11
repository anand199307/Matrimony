import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Text from "../../../components/common/GlobalText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/tabs/Home";
import colors from "../../../configurations/config/color.config";
import Content from "../../../components/app/ManageAccountPageContent";
import Button from "../../../components/common/Button";
import Header from "../../../components/app/ProfileHeader";
import TextInputCustom from "../../../components/common/TextInputCustom";
import { valueType, formValue } from "../../../utilis/types/SignUp";
import OTP from "../../../components/auth/OtpComponent";
import { deleteAccountReasonList } from "../../../utilis/staticData/Profile";
import { AlertPopup } from "../../../utilis/helper/Alert";

//redux
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../redux/actions";

const DeleteAccount = () => {
  const [code, setCode] = useState<string>("");
  const [count, setCount] = useState<number>(120);
  const [form, setForm] = useState<valueType>({ ...formValue });
  const [selectedReason, setSelectedReason] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const navFunc = () => navigation.navigate("ManageAccount");
  const tokenAndNumber = useSelector(
    (state: any) => state?.auth?.forgotPasswordMobileNumber
  );

  const toogleFunc = (text: string) => {};
  const otpResend = () => {};
  const alertCancel = () => console.log("");

  const alertOk = () => {};
  const openAlert = () => {
    AlertPopup(
      "Delete account",
      "Are you sure You have to Delete",
      alertOk,
      alertCancel
    );
  };
  return (
    <View style={styles.container}>
      <Header title="Delete Account" navFunc={navFunc} />
      <ScrollView style={styles.body}>
        <Content
          title="Looks like this is goodbye!"
          content="Before you go, let us understand why you’ve decided to delete your account."
        />
        <View style={styles.DeletedAccountContainer}>
          {deleteAccountReasonList?.map((item) => (
            <TouchableOpacity
              style={[
                selectedReason === item?.id
                  ? styles.optionSelectedContainer
                  : styles.optionContainer,
              ]}
              onPress={() => setSelectedReason(item?.id)}
              key={item?.id}
            >
              <Text
                style={[
                  selectedReason === item?.id
                    ? styles.activeReasonText
                    : styles.reasonText,
                ]}
              >
                {item?.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.greyContent, { marginBottom: 15 }]}>
          Enter password to confirm deletion
        </Text>
        <TextInputCustom
          placeholder="Enter Your Password"
          value={form.password}
          error={form.passwordError}
          activeIcon={toogleFunc}
          showHideControll={true}
          onChangeText={(password) =>
            setForm({ ...form, password, passwordError: "" })
          }
          label="Confirm Password"
        />

        {/* <Text style={styles.text}>
          Code has been send to {tokenAndNumber?.mobileNumber}
        </Text>
        <View style={styles.otpBody}>
          <OTP
            code={code}
            count={count}
            settingCount={setCount}
            settingCode={setCode}
            reSend={otpResend}
          />
        </View> */}

        <Button title="Continue Deleting" MV={10} onPressFunc={openAlert} />
      </ScrollView>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  body: {
    flex: 0.85,
    padding: 20,
  },
  greyContent: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.S_TEXT,
    lineHeight: 20,
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: colors.BORDER_FORM,
    height: 45,
    width: "100%",
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    color: "#9F9F9F",
  },
  optionSelectedContainer: {
    backgroundColor: colors.SECONDARY_COLOR,
    color: colors.WHITE,
    height: 45,
    width: "100%",
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  reasonText: {
    color: "#9F9F9F",
  },
  activeReasonText: {
    color: colors.WHITE,
  },
  DeletedAccountContainer: {
    marginVertical: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.T_TEXT,
    textAlign: "center",
    marginTop: 50,
  },
  otpBody: {
    flex: 0.4,
    marginTop: 30,
  },
});
