import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";

function Split(props) {
  const { split, setSplit } = props;
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Split: </Text>
        <TextInput
          style={styles.sectionInput}
          value={split.toString()}
          onChangeText={setSplit}
          maxLength={3}
          keyboardType="number-pad"></TextInput>
      </View>
      <Rating split={split} setSplit={setSplit} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
  },
  sectionInput: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    minWidth: 50,
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
