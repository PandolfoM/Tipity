import { ThemedView } from "./ThemedView";
import {
  Modal,
  SectionList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "@/context/AppContext";
import { Text } from "./ThemedText";
import sizes from "@/config/sizes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import RadioButton from "./RadioButton";
import { useThemeColor } from "@/hooks/useThemeColors";

const data: { title: string; data: ("auto" | "dark" | "light")[] }[] = [
  { title: "Appearance", data: ["auto", "dark", "light"] },
];

function Header() {
  const { isRounding, setIsRounding } = useApp();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const secColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const whiteColor = useThemeColor({}, "white");

  return (
    <>
      <View style={styles.header}>
        <View style={styles.roundContainer}>
          <Switch
            value={isRounding}
            style={styles.switch}
            trackColor={{
              false: secColor,
              true: accentColor,
            }}
            onValueChange={() => setIsRounding(!isRounding)}
          />
          <Text style={[styles.roundText]}>Round Up</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            name="cog"
            size={sizes.flg}
            color={whiteColor}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType={"slide"}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ThemedView style={[{ flex: 1 }]}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ alignSelf: "flex-end", margin: 15 }}>
            <MaterialCommunityIcons
              name="close"
              size={sizes.fxl}
              color={whiteColor}
            />
          </TouchableOpacity>
          <SectionList
            sections={data}
            keyExtractor={(item, i) => item + i}
            renderItem={({ item }) => <RadioButton name={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.title}>{title}</Text>
            )}
          />
        </ThemedView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "3%",
    display: "flex",
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
  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: sizes.fmd,
  },
});

export default Header;
