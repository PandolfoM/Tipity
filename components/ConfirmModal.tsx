import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";
import { Text } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";

type Props = {
  visible: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  visible,
  text,
  onConfirm,
  onCancel,
}: Props) {
  const secColor = useThemeColor({}, "secondary");
  const accentColor = useThemeColor({}, "accent");
  const textColor = useThemeColor({}, "text");

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={[styles.modal]}>
        <View style={[styles.modalContent, { backgroundColor: secColor }]}>
          <Text type="title" style={{ textAlign: "center" }}>
            Are you sure?
          </Text>
          <Text type="subtitle" style={{ textAlign: "center" }}>
            {text}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 80,
              paddingTop: 50,
            }}>
            <Button title="Cancel" color={textColor} onPress={onCancel} />
            <Button title="Confirm" color={accentColor} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContent: {
    padding: 20,
  },
});
