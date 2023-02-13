import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";
import Rating from "./Rating";

function Split({ split, setSplit }) {
  const isDarkMode = useDarkMode();
  let valuesArr = [];
  const { fontScale } = useWindowDimensions();
  const styles = makeStyles(fontScale);
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}`, color: "white" });
  }

  return (
    <View>
      <View style={[styles.section, { backgroundColor: isDarkMode.secondary }]}>
        <Text
          style={[
            styles.sectionTitle,
            { backgroundColor: isDarkMode.secondary },
          ]}>
          Split:{" "}
        </Text>
        <TextInput
          maxLength={3}
          onFocus={() => setSplit("")}
          onEndEditing={() => !split && setSplit("1")}
          onChangeText={(value) => setSplit(value)}
          keyboardType="number-pad"
          value={split.toString()}
          style={[styles.numberInput, { color: isDarkMode.accent }]}
        />
      </View>
      <Rating split={split} setSplit={setSplit} />
    </View>
  );
}

const makeStyles = (fontScale) =>
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
  });

export default Split;
