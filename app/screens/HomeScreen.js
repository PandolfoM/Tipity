import React, { useState } from "react";
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
import { FakeCurrencyInput } from "react-native-currency-input";
import Header from "../components/Header";
import Service from "../components/Service";
import Split from "../components/Split";
import Totals from "../components/Totals";
import colors from "../config/colors";
import sizes from "../config/sizes";

function HomeScreen() {
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0.0);
  const [split, setSplit] = useState(1);
  const [service, setService] = useState(15);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle={"light-content"} />
        <View>
          <Header isRounding={isRounding} setIsRounding={setIsRounding} />
          <View>
            {/* Bill Total */}
            <Text style={styles.sectionTitle}>Bill Total:</Text>
            <FakeCurrencyInput
              value={billTotal}
              onChangeValue={(formattedValue) => {
                setBillTotal(!formattedValue ? 0 : formattedValue);
              }}
              keyboardType="number-pad"
              style={styles.billInput}
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
