import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import sizes from "@/config/sizes";
import NumberText from "@/components/NumberText";
import { Text } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useApp } from "@/context/AppContext";

function Totals() {
  const { service, split, billTotal, setBillTotal, setTotal, setTip } =
    useApp();
  const { fontScale, scale } = useWindowDimensions();
  const styles = makeStyles(fontScale, scale);

  let Total = billTotal.toString().replace(/[,$]/g, "");
  let TipPercent: string = "0.0";

  const textColor = useThemeColor({}, "text");
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

  useEffect(() => {
    setTotal(TotalWTip.toFixed(2));
    setTip(Tip.toFixed(2));
  }, [TotalWTip, Tip]);

  return (
    <View>
      <View style={[styles.total, { backgroundColor: tertiaryColor }]}>
        <View style={styles.totalText}>
          <Text type="title" style={[{ paddingTop: sizes.xs }]}>
            Total:
          </Text>
          <TouchableOpacity onPress={() => setBillTotal(0)}>
            <MaterialCommunityIcons
              style={[styles.totalTextSub, { color: textColor }]}
              name="undo"
            />
          </TouchableOpacity>
        </View>
        <NumberText number={TotalWTip} style={styles.totalCalculated} />
      </View>
      <Text type="title" style={[styles.totalsCategory]}>
        Per Person:
      </Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: tertiaryColor },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader]}>With Tip:</Text>
          <NumberText
            number={split && split > 0 ? TotalWTip / split : TotalWTip}
            style={styles.totalExtrasPrice}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader]}>Without Tip:</Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={parseFloat(Total) / (split ?? 1)}
          />
        </View>
      </View>
      <Text type="title" style={[styles.totalsCategory]}>
        Tip:
      </Text>
      <View
        style={[
          styles.totalExtrasContainer,
          { borderTopColor: tertiaryColor },
        ]}>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader]}>Total:</Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={(parseFloat(Total) || 0) * parseFloat(TipPercent)}
          />
        </View>
        <View style={styles.totalExtras}>
          <Text style={[styles.totalExtrasHeader]}>Per Person:</Text>
          <NumberText
            style={styles.totalExtrasPrice}
            number={
              ((parseFloat(Total) || 0) * parseFloat(TipPercent)) / (split ?? 1)
            }
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
      fontWeight: "bold",
      alignSelf: "center",
      paddingVertical: sizes.xxs,
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
      paddingTop: sizes.xs,
    },
  });
