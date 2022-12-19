import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";
import Screen from "./Screen";
import AppText from "./Text";
import RadioButton from "./RadioButton";

function Header({ isRounding, setIsRounding, setBillTotal }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [appearance, setAppearance] = useState("Auto");
  const colorScheme = useColorScheme();
  const isDarkMode = useDarkMode(colorScheme);
  const data = [{ title: "Appearance", data: ["Auto", "Dark", "Light"] }];

  return (
    <>
      <View style={styles.header}>
        <View style={styles.roundContainer}>
          <Switch
            value={isRounding}
            style={styles.switch}
            trackColor={{
              false: isDarkMode.secondary,
              true: isDarkMode.accent,
            }}
            onValueChange={() => setIsRounding(!isRounding)}
          />
          <Text style={[styles.roundText, { color: isDarkMode.white }]}>
            Round Up
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            name="cog"
            size={sizes.flg}
            color={isDarkMode.white}
          />
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType={"slide"}>
        <Screen
          style={{
            backgroundColor: isDarkMode.primary,
          }}>
          <Button
            title="Close"
            onPress={() => setModalVisible(false)}
            color={isDarkMode.accent}
          />
          <SectionList
            sections={data}
            keyExtractor={(item, i) => item + i}
            renderItem={({ item }) => (
              <RadioButton
                name={item}
                appearance={appearance}
                setAppearance={setAppearance}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <AppText style={{ color: isDarkMode.white }}>{title}</AppText>
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    fontSize: sizes.fsm,
    paddingLeft: sizes.sm,
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
});

export default Header;
