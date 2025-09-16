import React, { useRef, useState } from "react";
import { Modal } from "react-native";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TooltipProps {
  visible: boolean;
  onToggle: () => void;
  text: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
}

const Tooltip: React.FC<TooltipProps> = ({
  visible,
  onToggle,
  text,
  accentColor = "#007AFF",
  backgroundColor = "#FFF",
  textColor = "#222",
  style = {},
}) => {
  const iconRef = useRef<View>(null);
  const [iconPos, setIconPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleIconLayout = () => {
    if (iconRef.current) {
      (iconRef.current as any).measureInWindow((x: number, y: number) => {
        setIconPos({ x, y });
      });
    }
  };

  return (
    <>
      <View style={{ position: "relative", ...style }}>
        <Pressable
          ref={iconRef}
          onPress={onToggle}
          style={{ marginLeft: 4 }}
          onLayout={handleIconLayout}>
          <MaterialCommunityIcons
            name="information"
            size={18}
            color={accentColor}
          />
        </Pressable>
      </View>
      {visible && (
        <Modal
          transparent
          animationType="none"
          visible={visible}
          onRequestClose={onToggle}>
          <Pressable onPress={onToggle} style={styles.fullScreenOverlay} />
          <View
            style={[
              styles.tooltipModal,
              {
                backgroundColor,
                top: iconPos.y + 24,
                left: iconPos.x,
                position: "absolute",
              },
            ]}>
            <Text style={[styles.tooltipText, { color: textColor }]}>
              {text}
            </Text>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tooltipModal: {
    position: "absolute",
    padding: 8,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 200,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    backgroundColor: "transparent",
  },
  tooltip: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
  },
  tooltipText: {
    fontSize: 14,
  },
});

export default Tooltip;
