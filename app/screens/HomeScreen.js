import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import colors from "../config/colors";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Header />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subcontainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
