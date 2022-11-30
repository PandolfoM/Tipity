import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import colors from "../config/colors";

function Header() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={styles.clearButton} onPress={() => console.log("Cleared")}>
        Clear
      </Text>
      <View style={styles.roundContainer}>
        <Switch
          value={isEnabled}
          trackColor={{ false: colors.secondary, true: colors.accent }}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
        <Text style={styles.roundText}>Round Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    color: colors.white,
    fontSize: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roundContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundText: {
    color: colors.white,
    fontSize: 20,
    paddingLeft: 10,
  },
});

export default Header;
