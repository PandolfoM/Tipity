import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";

function Totals(props) {
  return (
    <View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total With Tip: </Text>
        <Text style={[styles.totalText, styles.totalTextAccent]}>$0.00</Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Total Per Person:</Text>
        <Text style={styles.totalExtrasPrice}>$0.00</Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Total Tip:</Text>
        <Text style={styles.totalExtrasPrice}>$0.00</Text>
      </View>
      <View style={styles.totalExtras}>
        <Text style={styles.totalExtrasHeader}>Tip Per Person:</Text>
        <Text style={styles.totalExtrasPrice}>$0.00</Text>
      </View>
    </View>
  );
}

export default Totals;

const styles = StyleSheet.create({
  total: {
    backgroundColor: colors.tertiary,
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
  },
  totalExtras: {
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalExtrasHeader: {
    color: colors.white,
    fontSize: sizes.flg,
    fontWeight: "bold",
  },
  totalExtrasPrice: {
    color: colors.accent,
    fontWeight: "bold",
    fontSize: sizes.flg,
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
