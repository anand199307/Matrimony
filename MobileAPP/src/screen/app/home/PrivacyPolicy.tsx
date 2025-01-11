import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import colors from "../../../configurations/config/color.config";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigation/tabs/Home";
import {
  privacyPolicy,
  TermsAndService,
  FAQ,
} from "../../../utilis/staticData/Profile";
import Header from "../../../components/app/ProfileHeader";
import Content from "../../../components/app/PrivacyContent";

type screenNavigationProps = RouteProp<StackParamList, "PrivacyPolicy">;

const PrivacyPolicy = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const {
    params: { componentName },
  } = useRoute<screenNavigationProps>();
  const navFunc = () => navigation.navigate("Privacy");
  return (
    <View style={styles.container}>
      <Header title={componentName} navFunc={navFunc} />
      <View style={styles.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            componentName === "Privacy Policy"
              ? privacyPolicy
              : componentName === "Terms of Services"
              ? TermsAndService
              : FAQ
          }
          renderItem={({ item }: any) => <Content item={item} />}
          keyExtractor={(item: any) => item?.id}
        />
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_COLOR,
  },
  header: {
    flex: 0.15,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  body: {
    flex: 0.83,
    paddingHorizontal: 20,
  },
});
