import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";

function Totals(props) {
  const { billTotal, split, service, isRounding, setBillTotal } = props;
  let Total = billTotal.toString().replaceAll(/[,$]/g, "");
  let TipPercent =
    `${service.toString().length > 1 ? "0." : "0.0"}` + service.toString();
  let Tip = Total * TipPercent;
  let TotalWTip = parseInt(Total.toString().replace(/\.(.*)/g, "")) + Tip;

  return (
    <View>
      <View style={styles.total}>
        <View style={styles.totalText}>
          <Text style={styles.totalTextSub}>Total:</Text>
          <Pressable
            style={styles.totalTextSub}
            onPress={() => setBillTotal(0)}>
            <FontAwesomeIcon
              style={styles.totalTextSub}
              icon={faRotateLeft}
              size={sizes.flg}
            />
          </Pressable>
        </View>
        <Text
          numberOfLines={1}
          style={styles.totalTextAccent}
          adjustsFontSizeToFit>
          $
          {isRounding
            ? Math.ceil(TotalWTip).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : TotalWTip.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </Text>
      </View>
      <Text style={styles.totalsCategory}>Per Person:</Text>
      <View style={styles.totalExtrasContainer}>
        <View style={styles.totalExtras}>
          <Text style={styles.totalExtrasHeader}>With Tip:</Text>
          <Text
            numberOfLines={1}
            style={styles.totalExtrasPrice}
            adjustsFontSizeToFit>
            $
            {isRounding
              ? Math.ceil(TotalWTip / split).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : (TotalWTip / split).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </Text>
        </View>
        <View style={styles.totalExtras}>
          <Text style={styles.totalExtrasHeader}>Without Tip:</Text>
          <Text
            numberOfLines={1}
            style={styles.totalExtrasPrice}
            adjustsFontSizeToFit>
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
      </View>
      <Text style={styles.totalsCategory}>Tip:</Text>
      <View style={styles.totalExtrasContainer}>
        <View style={styles.totalExtras}>
          <Text style={styles.totalExtrasHeader}>Total:</Text>
          <Text
            numberOfLines={1}
            style={styles.totalExtrasPrice}
            adjustsFontSizeToFit>
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
          <Text style={styles.totalExtrasHeader}>Per Person:</Text>
          <Text
            numberOfLines={1}
            style={styles.totalExtrasPrice}
            adjustsFontSizeToFit>
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
    </View>
  );
}

export default Totals;

const styles = StyleSheet.create({
  info: {
    fontSize: sizes.fsm,
  },
  total: {
    backgroundColor: colors.tertiary,
    height: 150,
    paddingHorizontal: sizes.sm,
    paddingVertical: sizes.xs,
  },
  totalsCategory: {
    color: colors.white,
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
    borderTopColor: colors.tertiary,
    borderRadius: 50,
    borderTopWidth: 2,
  },
  totalExtrasHeader: {
    color: colors.white,
    fontSize: sizes.fmd,
    fontWeight: "500",
    textAlign: "center",
  },
  totalExtrasPrice: {
    color: colors.accent,
    fontWeight: "500",
    fontSize: sizes.fxl,
    textAlign: "center",
  },
  totalText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalTextAccent: {
    fontWeight: "bold",
    color: colors.accent,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 80,
  },
  totalTextSub: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
  },
});
