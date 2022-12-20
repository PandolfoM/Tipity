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
import sizes from "../config/sizes";
import storage from "../utils/storage";
import useDarkMode from "../hooks/useDarkMode";

function HomeScreen({ ...otherProps }) {
  const isDarkMode = useDarkMode();
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0);
  const [split, setSplit] = useState(1);
  const [service, setService] = useState(15);
  const data = ["split", "service", "rounding"];

  let arr = [];
  const getData = async (item) => {
    const value = await storage.getData(item);
    arr.push(value);
    setSplit(arr[0] || 1);
    setService(arr[1] || 15);
    setIsRounding(arr[2] || false);
  };

  useEffect(() => {
    data.map((i) => getData(i));
  }, []);

  useEffect(() => {
    storage.storeData("split", split);
  }, [split]);

  useEffect(() => {
    storage.storeData("rounding", isRounding);
  }, [isRounding]);

  useEffect(() => {
    storage.storeData("service", service);
  }, [service]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      {...otherProps}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: isDarkMode.primary }]}>
        <StatusBar animated={true} barStyle={"light-content"} />
        <View>
          <Header
            isRounding={isRounding}
            setIsRounding={setIsRounding}
            setBillTotal={setBillTotal}
          />
          <View>
            {/* Bill Total */}
            <Text
              style={[
                styles.sectionTitle,
                { backgroundColor: isDarkMode.secondary },
              ]}>
              Bill Total:
            </Text>
            <TextInputMask
              autoComplete={false}
              autoCapitalize={false}
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
              onPressIn={() => setBillTotal("")}
              onChangeText={setBillTotal}
              keyboardType="number-pad"
              style={[
                styles.billInput,
                {
                  backgroundColor: isDarkMode.secondary,
                  color: isDarkMode.accent,
                },
              ]}
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
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
  },
});

export default HomeScreen;
