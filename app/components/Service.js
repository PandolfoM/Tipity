import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";

function Service(props) {
  let valuesArr = [];
  const { service, setService } = props;
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}`, color: "white" });
  }

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service: </Text>
        <TextInput
          maxLength={3}
          onFocus={() => setService("")}
          onChangeText={(value) => setService(value > 100 ? 100 : value)}
          keyboardType="number-pad"
          value={service === null ? "1" : service.toString()}
          style={styles.numberInput}
        />
        <Text style={styles.percent}>%</Text>
      </View>
      <Rating service={service} setService={setService} />
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
  percent: {
    fontSize: sizes.flg,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    color: colors.accent,
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

export default Service;
