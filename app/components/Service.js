import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";
import Rating from "./Rating";

function Service(props) {
  const { service, setService } = props;
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service: </Text>
        <TextInput
          style={styles.sectionInput}
          value={service.toString()}
          onChangeText={setService}
          maxLength={3}
          keyboardType="number-pad"></TextInput>
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
