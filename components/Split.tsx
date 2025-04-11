import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import sizes from "../config/sizes";
import { useApp } from "@/context/AppContext";
import { useThemeColor } from "@/hooks/useThemeColors";
import Slider from "./Slider";

function Split() {
  const { split, setSplit } = useApp();
  let valuesArr = [];
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}`, color: "white" });
  }

  const backgroundColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");

  return (
    <View>
      <View style={[styles.section, { backgroundColor }]}>
        <Text style={[styles.sectionTitle, { backgroundColor }]}>Split: </Text>
        <TextInput
          maxLength={3}
          onFocus={() => setSplit(undefined)}
          onEndEditing={() => !split && setSplit(1)}
          onChangeText={(value) => setSplit(Number(value))}
          keyboardType="number-pad"
          value={split !== undefined ? split.toString() : ""}
          style={[styles.numberInput, { color: accentColor, flex: 1 }]}
        />
      </View>
      <Slider state={split} setState={setSplit} />
    </View>
  );
}

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    numberInput: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      alignSelf: "center",
    },
    pickerContainer: {
      flexDirection: "column",
      justifyContent: "center",
    },
    section: {
      flexDirection: "row",
    },
    sectionTitle: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      color: "white",
      paddingLeft: sizes.sm,
      paddingVertical: sizes.xs,
    },

    container: {
      alignItems: "stretch",
      justifyContent: "center",
      marginHorizontal: sizes.sm,
      marginVertical: 10 / fontScale,
    },
    thumb: {
      height: 40 / fontScale,
      width: 40 / fontScale,
      borderRadius: "100%",
    },
    track: {
      height: 15 / fontScale,
      borderRadius: 15 / fontScale,
    },
  });

export default Split;
