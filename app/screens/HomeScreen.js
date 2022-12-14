import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Header from "../components/Header";
import Service from "../components/Service";
import Split from "../components/Split";
import Totals from "../components/Totals";
import colors from "../config/colors";
import sizes from "../config/sizes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../utils";

function HomeScreen() {
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0);
  const [split, setSplit] = useState(1);
  const [service, setService] = useState(15);

  const storeData = async (splitAmt, serviceAmt, rounding) => {
    try {
      await AsyncStorage.setItem("splitAmt", splitAmt.toString());
      await AsyncStorage.setItem("serviceAmt", serviceAmt.toString());
      await AsyncStorage.setItem("rounding", rounding.toString());
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    getData().then((value) => {
      setSplit(value[0]);
      setService(value[1]);
      setIsRounding(value[2] === "true" ? true : false);
    });
  }, []);

  useEffect(() => {
    storeData(split, service, isRounding);
  }, [split, service, isRounding]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle={"light-content"} />
        <View>
          <Header
            isRounding={isRounding}
            setIsRounding={setIsRounding}
            setBillTotal={setBillTotal}
          />
          <View>
            {/* Bill Total */}
            <Text style={styles.sectionTitle}>Bill Total:</Text>
            <TextInputMask
              type="money"
              maxLength={11}
              options={{
                precision: 2,
                separator: ".",
                delimiter: ",",
                unit: "$",
                suffixUnit: "",
              }}
              value={billTotal}
              onChangeText={setBillTotal}
              keyboardType="number-pad"
              style={styles.billInput}
            />
            {/* Split check */}
            <Split split={split} setSplit={setSplit} />
            {/* Service */}
            <Service service={service} setService={setService} />
            <Totals
              billTotal={billTotal}
              split={split}
              service={service}
              isRounding={isRounding}
              setBillTotal={setBillTotal}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  billInput: {
    height: 100,
    fontSize: height >= 1194 ? 100 : 50,
    color: colors.accent,
    textAlign: "center",
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    backgroundColor: colors.secondary,
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
  },
});

export default HomeScreen;
