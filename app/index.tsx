import Header from "@/components/Header";
import Split from "@/components/Split";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import sizes from "@/config/sizes";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";

export default function Index() {
  const [billTotal, setBillTotal] = useState(0.0);
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={[styles.container]}>
        <Header />

        {/* Bill Total */}
        <View style={[{ backgroundColor }]}>
          <Text style={[styles.sectionTitle]}>Bill Total</Text>
          <FakeCurrencyInput
            autoComplete="off"
            autoCapitalize="none"
            placeholderTextColor={"#fff"}
            value={billTotal}
            onChangeValue={(formattedValue) => {
              setBillTotal(!formattedValue ? 0 : formattedValue);
            }}
            keyboardType="number-pad"
            style={[
              styles.billInput,
              {
                color: accentColor,
              },
            ]}
            maxLength={11}
            prefix="$"
            delimiter=","
            separator="."
          />
        </View>

        {/* Split */}
        <Split />

        {/* Service */}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const makeStyles = (fontScale: number) =>
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
