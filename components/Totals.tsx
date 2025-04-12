import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import sizes from "../config/sizes";
import NumberText from "./NumberText";
import { Text } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useApp } from "@/context/AppContext";

function Totals() {
  const { service, split, billTotal, setBillTotal, setSplit } = useApp();
  const { fontScale, scale } = useWindowDimensions();
  const styles = makeStyles(fontScale, scale);

  if (!split) return;

  let Total = billTotal.toString().replace(/[,$]/g, "");
  let TipPercent: string = "0.0";

  const whiteColor = useThemeColor({}, "white");
  const tertiaryColor = useThemeColor({}, "tertiary");

  if (service != undefined) {
    if (service.toString() === "100") {
      TipPercent = "2";
    } else if (service.toString().length > 1) {
      TipPercent = "0." + service.toString();
    } else {
      TipPercent = "0.0" + service.toString();
    }
  }

  let Tip = parseFloat(
    String((parseFloat(Total) || 0) * parseFloat(TipPercent))
  );
  let TotalWTip = Tip + (parseFloat(Total) || 0);

  return (
    <View>
      <View style={[styles.total, { backgroundColor: tertiaryColor }]}>
        <View style={styles.totalText}>
          <Text style={[styles.totalTextSub, { color: whiteColor }]}>
            Total:
          </Text>
          <TouchableOpacity
            style={[styles.totalTextSub]}
            onPress={() => setBillTotal(0)}>
            <MaterialCommunityIcons
              style={[styles.totalTextSub, { color: whiteColor }]}
              name="undo"
              size={sizes.flg}
            />
          </TouchableOpacity>
        </View>
        <NumberText number={TotalWTip} style={styles.totalCalculated} />
      </View>
      <Text style={[styles.totalsCategory, { color: whiteColor }]}>
        Per Person:
      </Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: tertiaryColor },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: whiteColor }]}>
            With Tip:
          </Text>
          <NumberText
            number={TotalWTip / split}
            style={styles.totalExtrasPrice}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: whiteColor }]}>
            Without Tip:
          </Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={parseFloat(Total) / split}
          />
        </View>
      </View>
      <Text style={[styles.totalsCategory, { color: whiteColor }]}>Tip:</Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: tertiaryColor },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: whiteColor }]}>
            Total:
          </Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={(parseFloat(Total) || 0) * parseFloat(TipPercent)}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader, { color: whiteColor }]}>
            Per Person:
          </Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={((parseFloat(Total) || 0) * parseFloat(TipPercent)) / split}
          />
        </View>
      </View>
    </View>
  );
}

export default Totals;

const makeStyles = (fontScale: number, scale: number) =>
  StyleSheet.create({
    total: {
      height: 400 / scale,
      justifyContent: "center",
      position: "relative",
    },
    totalCalculated: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignSelf: "center",
    },
    totalsCategory: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      alignSelf: "center",
      paddingVertical: 5 / fontScale,
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
      fontSize: 20 / fontScale,
      fontWeight: "500",
      textAlign: "center",
    },
    totalExtrasPrice: {
      fontWeight: "500",
      fontSize: 35 / fontScale,
    },
    totalText: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      width: "100%",
      top: 0,
      paddingHorizontal: sizes.sm,
    },
    totalTextSub: {
      fontSize: 35 / fontScale,
      fontWeight: "bold",
      alignSelf: "center",
    },
  });
