import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Header from "../components/Header";
import Service from "../components/Service";
import Split from "../components/Split";
import Totals from "../components/Totals";
import sizes from "../config/sizes";
import storage from "../utils/storage";
import useDarkMode from "../hooks/useDarkMode";
import { FakeCurrencyInput } from "react-native-currency-input";

function HomeScreen({ ...otherProps }) {
  const isDarkMode = useDarkMode();
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0.0);
  const [split, setSplit] = useState(1);
  const [service, setService] = useState(15);
  const data = ["split", "service", "rounding"];
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

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
          <Header isRounding={isRounding} setIsRounding={setIsRounding} />
          <View style={styles.mainContainer}>
            {/* Bill Total */}
            <Text
              style={[
                styles.sectionTitle,
                { backgroundColor: isDarkMode.secondary },
              ]}>
              Bill Total:
            </Text>
            <FakeCurrencyInput
              autoComplete={false}
              autoCapitalize={false}
              value={billTotal}
              onChangeValue={(formattedValue) => {
                setBillTotal(!formattedValue ? 0 : formattedValue);
              }}
              keyboardType="number-pad"
              style={[
                styles.billInput,
                {
                  backgroundColor: isDarkMode.secondary,
                  color: isDarkMode.accent,
                },
              ]}
              maxLength={11}
              prefix="$"
              delimiter=","
              separator="."
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

const makeStyles = (fontScale) =>
  StyleSheet.create({
    billInput: {
      height: 100,
      fontSize: 60 / fontScale,
      textAlign: "center",
      fontWeight: "500",
    },
    container: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      color: "white",
      paddingLeft: sizes.sm,
      paddingVertical: sizes.xs,
    },
  });

export default HomeScreen;
