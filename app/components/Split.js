import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";
import Rating from "./Rating";

function Split(props) {
  const colorScheme = useColorScheme();
  const isDarkMode = useDarkMode(colorScheme);
  let valuesArr = [];
  const { split, setSplit } = props;
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

const styles = StyleSheet.create({
  numberInput: {
    fontSize: sizes.flg,
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
  sectionInput: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
  },
});

export default Split;
