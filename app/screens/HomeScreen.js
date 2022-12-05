import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

function HomeScreen() {
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0);
  const [split, setSplit] = useState(1);
  const [service, setService] = useState(15);

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

const styles = StyleSheet.create({
  billInput: {
    height: 100,
    fontSize: 50,
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
