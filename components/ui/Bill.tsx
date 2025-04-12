import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Text } from "@/components/ThemedText";
import { FakeCurrencyInput } from "react-native-currency-input";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import sizes from "@/config/sizes";

function Bill() {
  const { billTotal, setBillTotal } = useApp();
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");

  return (
    <View style={[{ backgroundColor }]}>
      <View>
        <Text type="title" style={[styles.sectionTitle, { color: whiteColor }]}>
          Bill Total
        </Text>
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
    </View>
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
      paddingLeft: sizes.sm,
    },
  });

export default Bill;
