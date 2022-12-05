import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";
import RNPickerSelect from "react-native-picker-select";

function Service(props) {
  let valuesArr = [];
  const { service, setService } = props;
  for (let i = 1; i < 101; i++) {
    valuesArr.push({ label: `${i}`, value: `${i}` });
  }

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service: </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) =>
              setService(service === null ? "1" : service.toString())
            }
            value={service === null ? "1" : service.toString()}
            style={styles.picker}
            items={valuesArr}
          />
        </View>
        <Text style={styles.percent}>%</Text>
      </View>
      <Rating service={service} setService={setService} />
    </View>
  );
}

const styles = StyleSheet.create({
  badPerson: {
    color: "red",
    textAlign: "right",
    alignSelf: "center",
    paddingRight: sizes.sm,
    flex: 1,
    fontSize: sizes.fmd,
  },
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
