import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import sizes from "../config/sizes";
import useDarkMode from "../hooks/useDarkMode";
import Screen from "./Screen";
import AppText from "./Text";
import RadioButton from "./RadioButton";
import storage from "../utils/storage";
import DarkContext from "../utils/context";

function Header({ isRounding, setIsRounding }) {
  const { darkMode, setDarkMode } = useContext(DarkContext);
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useDarkMode();
  const data = [{ title: "Appearance", data: ["auto", "dark", "light"] }];

  useEffect(() => {
    storage.storeData("darkMode", darkMode);
  }, [darkMode]);

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
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ alignSelf: "flex-end", margin: 15 }}>
            <MaterialCommunityIcons
              name="close"
              size={sizes.fxl}
              color={isDarkMode.white}
            />
          </TouchableOpacity>
          <SectionList
            sections={data}
            keyExtractor={(item, i) => item + i}
            renderItem={({ item }) => (
              <RadioButton
                name={item}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
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
