import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";

function Header(props) {
  const { isRounding, setIsRounding } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.clearButton} onPress={() => console.log("Cleared")}>
        Clear
      </Text>
      <View style={styles.roundContainer}>
        <Switch
          value={isRounding}
          trackColor={{ false: colors.secondary, true: colors.accent }}
          onValueChange={() => setIsRounding(!isRounding)}
        />
        <Text style={styles.roundText}>Round Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    color: colors.white,
    fontSize: sizes.fmd,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: sizes.sm,
    marginBottom: sizes.sm,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    color: colors.white,
    fontSize: sizes.fmd,
    paddingLeft: sizes.sm,
  },
});

export default Header;
