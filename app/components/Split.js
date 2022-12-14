import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";

function Split(props) {
  let valuesArr = [];
  const { split, setSplit } = props;
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}`, color: "white" });
  }

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Split: </Text>
        <TextInput
          maxLength={3}
          onFocus={() => setSplit("")}
          onEndEditing={() => !split && setSplit("1")}
          onChangeText={(value) => setSplit(value)}
          keyboardType="number-pad"
          value={split.toString()}
          style={styles.numberInput}
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
    color: colors.accent,
    alignSelf: "center",
  },
  pickerContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  picker: {
    inputIOS: {
      fontSize: sizes.flg,
      fontWeight: "bold",
      color: colors.accent,
      alignSelf: "center",
      width: "100%",
      paddingRight: 20,
    },
    modalViewMiddle: {
      backgroundColor: colors.secondary,
      borderTopWidth: 0,
    },
    modalViewBottom: {
      backgroundColor: colors.primary,
    },
  },
  section: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
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
    backgroundColor: colors.secondary,
    paddingLeft: sizes.sm,
    paddingVertical: sizes.xs,
  },
});

export default Split;
