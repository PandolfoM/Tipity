import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";

function Totals({ billTotal, split, service, isRounding, setBillTotal }) {
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

const height = Dimensions.get("screen").height;
let totalHeight;
let totalFont;

if (height <= 667) {
  totalHeight = 100;
} else if (height >= 1194) {
  totalHeight = 300;
} else {
  totalHeight = 150;
}

if (height <= 667) {
  totalFont = 50;
} else if (height >= 1194) {
  totalFont = 180;
} else {
  totalFont = 80;
}

const styles = StyleSheet.create({
  info: {
    fontSize: sizes.fsm,
  },
  total: {
    backgroundColor: colors.tertiary,
    height: totalHeight,
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
    fontSize: height >= 1194 ? sizes.fxl : sizes.fmd,
    fontWeight: "500",
    textAlign: "center",
  },
  totalExtrasPrice: {
    color: colors.accent,
    fontWeight: "500",
    fontSize: height >= 1194 ? sizes.fxxl : sizes.fxl,
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
    fontSize: totalFont,
  },
  totalTextSub: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: colors.white,
    alignSelf: "center",
  },
});
