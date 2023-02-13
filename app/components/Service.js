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

function Service({ service, setService }) {
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
          Service:{" "}
        </Text>
        <TextInput
          maxLength={3}
          onFocus={() => setService("")}
          onEndEditing={() => !service && setService("15")}
          onChangeText={(value) => setService(value > 100 ? 100 : value)}
          keyboardType="number-pad"
          value={service.toString()}
          style={[styles.numberInput, { color: isDarkMode.accent }]}
        />
        <Text style={[styles.percent, { color: isDarkMode.accent }]}>%</Text>
      </View>
      <Rating service={service} setService={setService} />
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
    section: {
      flexDirection: "row",
    },
    percent: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      color: "white",
      alignSelf: "center",
    },
    sectionTitle: {
      fontSize: 25 / fontScale,
      fontWeight: "bold",
      color: "white",
      paddingLeft: sizes.sm,
      paddingVertical: sizes.xs,
    },
  });

export default Service;
