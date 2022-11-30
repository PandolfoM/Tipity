import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import Rating from "../components/Rating";
import colors from "../config/colors";

function HomeScreen() {
  const [isRounding, setIsRounding] = useState(false);
  const [billTotal, setBillTotal] = useState(0);
  const [split, setSplit] = useState(1);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View>
          <Header isRounding={isRounding} setIsRounding={setIsRounding} />
          <View>
            <Text style={styles.sectionTitle}>Bill Total:</Text>
            <TextInput
              value={billTotal}
              onChangeText={setBillTotal}
              keyboardType="numeric"
              placeholder={"0.00"}
              style={styles.billInput}
            />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Split:</Text>
              <TextInput
                style={styles.sectionInput}
                value={split.toString()}
                onChangeText={setSplit}
                maxLength={3}
                keyboardType="number-pad"></TextInput>
            </View>
            <Rating split={split} setSplit={setSplit} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  billInput: {
    height: 100,
    fontSize: 50,
    color: colors.accent,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  section: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionInput: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    minWidth: 50,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
