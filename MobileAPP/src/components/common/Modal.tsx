import { StyleSheet, Text, View, Modal, Image } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../configurations/config/color.config";
import { ICONS } from "../../assets/Icons/index";
import { Dispatch, SetStateAction } from "react";
import CouponCode from "../../components/app/CouponCode";

interface modalProps {
  show?: boolean;
  modalName?: string;
  setModalShow?: Dispatch<SetStateAction<any>>;
  navigateFunc?: () => void;
}

const ModalContiner = ({
  show,
  modalName,
  setModalShow,
  navigateFunc,
}: modalProps) => {
  // const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    setModalShow(show);

    const timeout = setTimeout(() => closeModal(), 2000);
    !show && clearTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);

  const closeModal = () => {
    setModalShow(false);
    navigateFunc();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setModalShow(show);
      }}
    >
      <View style={styles.centeredView}>
        {modalName === "congratulation" && (
          <View style={styles.middleView}>
            <Text style={styles.title}>Congratulations!</Text>
            <Image source={ICONS.Heart} style={styles.heartIcon} />
            <Text style={styles.content}>Your account is Verified. </Text>
            <Text style={styles.content}>You will be redirected Personal</Text>
            <Text style={styles.content}>details page in a few seconds..</Text>
          </View>
        )}

        {modalName === "couponCode" && (
          // <View style={styles.middleView}>
          <CouponCode />
          // </View>
        )}
      </View>
    </Modal>
  );
};

export default ModalContiner;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  middleView: {
    height: 350,
    width: 310,
    backgroundColor: "#fff",
    borderRadius: 40,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: colors.SECONDARY_COLOR,
  },
  heartIcon: {
    height: 140,
    width: 150,
    resizeMode: "contain",
    marginVertical: 20,
  },
  content: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.P_TEXT,
  },
});
