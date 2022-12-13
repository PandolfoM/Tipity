import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import colors from "../config/colors";
import sizes from "../config/sizes";

function Header(props) {
  const { isRounding, setIsRounding, setBillTotal } = props;

  return (
    <View style={styles.header}>
      <View style={styles.roundContainer}>
        <Switch
          value={isRounding}
          style={styles.switch}
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
    marginBottom: sizes.xs,
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    color: colors.white,
    fontSize: sizes.fsm,
    paddingLeft: sizes.sm,
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});

export default Header;
