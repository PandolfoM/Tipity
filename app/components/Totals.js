import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FixedText from "./FixedText";
import Text from "./Text";
import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";

function Totals({ billTotal, split, service, isRounding, setBillTotal }) {
  const isDarkMode = useDarkMode();
  let Total = billTotal.toString().replace(/[,$]/g, "");
  let TipPercent;

  if (service.toString() === "100") {
    TipPercent = "2";
  } else if (service.toString().length > 1) {
    TipPercent = "0." + service.toString();
  } else {
    TipPercent = "0.0" + service.toString();
  }

  let Tip = parseFloat(Total * TipPercent);
  let TotalWTip = Tip + parseFloat(!Total ? "0" : Total);

  return (
    <View>
      <View style={[styles.total, { backgroundColor: isDarkMode.tertiary }]}>
        <View style={styles.totalText}>
          <Text style={[styles.totalTextSub, { color: isDarkMode.white }]}>
            Total:
          </Text>
          <TouchableOpacity
            style={[styles.totalTextSub, { color: isDarkMode.white }]}
            onPress={() => setBillTotal(0)}>
            <MaterialCommunityIcons
              style={[styles.totalTextSub, { color: isDarkMode.white }]}
              name="undo"
              size={sizes.flg}
            />
          </TouchableOpacity>
        </View>
        <FixedText number={TotalWTip} isRounding={isRounding} />
      </View>
      <Text style={[styles.totalsCategory, { color: isDarkMode.white }]}>
        Per Person:
      </Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: isDarkMode.tertiary },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: isDarkMode.white }]}>
            With Tip:
          </Text>
          <FixedText
            number={TotalWTip / split}
            isRounding={isRounding}
            style={styles.totalExtrasPrice}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: isDarkMode.white }]}>
            Without Tip:
          </Text>
          <FixedText
            style={styles.totalExtrasPrice}
            number={Total / split}
            isRounding={isRounding}
          />
        </View>
      </View>
      <Text style={[styles.totalsCategory, { color: isDarkMode.white }]}>
        Tip:
      </Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: isDarkMode.tertiary },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: isDarkMode.white }]}>
            Total:
          </Text>
          <FixedText
            style={styles.totalExtrasPrice}
            number={Total * TipPercent}
            isRounding={isRounding}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: isDarkMode.white }]}>
            Per Person:
          </Text>
          <FixedText
            style={styles.totalExtrasPrice}
            number={(Total * TipPercent) / split}
            isRounding={isRounding}
          />
        </View>
      </View>
    </View>
  );
}

export default Totals;

const height = Dimensions.get("screen").height;
let totalHeight;

if (height <= 667) {
  totalHeight = 100;
} else if (height >= 1194) {
  totalHeight = 300;
} else {
  totalHeight = 150;
}

const styles = StyleSheet.create({
  info: {
    fontSize: sizes.fsm,
  },
  total: {
    height: totalHeight,
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
  },
  totalsCategory: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    alignSelf: "center",
  },
  totalExtras: {
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
    width: "50%",
  },
  totalExtrasContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 50,
    borderTopWidth: 2,
  },
  totalExtrasHeader: {
    fontSize: height >= 1194 ? sizes.fxl : sizes.fmd,
    fontWeight: "500",
    textAlign: "center",
  },
  totalExtrasPrice: {
    fontWeight: "500",
    fontSize: height >= 1194 ? sizes.fxxl : sizes.fxl,
  },
  totalText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalTextSub: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
