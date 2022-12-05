import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";
import RNPickerSelect from "react-native-picker-select";

function Split(props) {
  let valuesArr = [];
  const { split, setSplit } = props;
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}` });
  }

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Split: </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) =>
              setSplit(split === null ? "1" : split.toString())
            }
            value={split === null ? "1" : split.toString()}
            style={styles.picker}
            items={valuesArr}
          />
        </View>
      </View>
      <Rating split={split} setSplit={setSplit} />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  picker: {
    inputIOS: {
      fontSize: sizes.flg,
      fontWeight: "bold",
      color: colors.white,
      alignSelf: "center",
      width: "100%",
      paddingRight: 20,
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
