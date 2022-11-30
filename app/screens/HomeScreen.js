import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import Split from "../components/Split";
import colors from "../config/colors";
import sizes from "../config/sizes";

function HomeScreen() {
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0);
  const [split, setSplit] = useState(1);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View>
          <Header isRounding={isRounding} setIsRounding={setIsRounding} />
          <View>
            {/* Bill Total */}
            <Text style={styles.sectionTitle}>Bill Total:</Text>
            <TextInput
              value={billTotal}
              onChangeText={setBillTotal}
              keyboardType="numeric"
              placeholder={"0.00"}
              style={styles.billInput}
            />
            {/* Split check */}
            <Split split={split} setSplit={setSplit} />
            <Text style={styles.perWithoutTip}>
              Per Person Without Tip:{" "}
              <Text style={styles.accentText}>$10.00</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  accentText: {
    color: colors.accent,
  },
  billInput: {
    height: 100,
    fontSize: 50,
    color: colors.accent,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  perWithoutTip: {
    backgroundColor: "#414868",
    color: colors.white,
    fontSize: sizes.md,
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
    marginTop: sizes.sm,
    fontWeight: "bold",
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
