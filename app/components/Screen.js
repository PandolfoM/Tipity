import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet, SafeAreaView } from "react-native";

function Screen({ children, style, ...otherProps }) {
  return (
    <SafeAreaView style={[styles.screen, style]} {...otherProps}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
