import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";

function Totals(props) {
  const { billTotal, split, service, isRounding } = props;
  let Total = billTotal.toString().replaceAll(/[,$]/g, "");
  let TipPercent =
    `${service.toString().length > 1 ? "0." : "0.0"}` + service.toString();
  let Tip = Total * TipPercent;
  let ToalWTip = parseInt(Total.toString().replace(/\.(.*)/g, "")) + Tip;

  return (
    <View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total With Tip: </Text>
        <Text
          numberOfLines={1}
          style={[styles.totalText, styles.totalTextAccent]}>
          $
          {isRounding
            ? Math.ceil(ToalWTip).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : ToalWTip.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Per Person:</Text>
        <Text numberOfLines={1} style={styles.totalExtrasPrice}>
          $
          {isRounding
            ? Math.ceil(ToalWTip / split).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : (ToalWTip / split).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Per Person (No Tip):</Text>
        <Text numberOfLines={1} style={styles.totalExtrasPrice}>
          $
          {isRounding
            ? Math.ceil(Total / split).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : (Total / split).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Total Tip:</Text>
        <Text numberOfLines={1} style={styles.totalExtrasPrice}>
          $
          {isRounding
            ? Math.ceil(Total * TipPercent).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : (Total * TipPercent).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Tip Per Person:</Text>
        <Text numberOfLines={1} style={styles.totalExtrasPrice}>
          $
          {isRounding
            ? Math.ceil((Total * TipPercent) / split).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )
            : ((Total * TipPercent) / split).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
    </View>
  );
}

export default Totals;

const styles = StyleSheet.create({
  total: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
  },
  totalExtras: {
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalExtrasHeader: {
    color: colors.white,
    fontSize: sizes.fmd,
    fontWeight: "bold",
  },
  totalExtrasPrice: {
    color: colors.accent,
    fontWeight: "bold",
    fontSize: sizes.fmd,
    // backgroundColor: "dodgerblue",
    maxWidth: 150,
    width: 150,
    textAlign: "right",
  },
  totalText: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: colors.white,
  },
  totalTextAccent: {
    fontWeight: "bold",
    color: colors.accent,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 80,
  },
});
