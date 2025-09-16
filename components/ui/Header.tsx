import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useApp } from "@/context/AppContext";
import { Text } from "@/components/ThemedText";
import sizes from "@/config/sizes";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColors";
import Switch from "@/components/Switch";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSettings } from "@/context/SettingsContext";

function Header() {
  const [saved, setSaved] = useState(false);
  const { isRounding, setIsRounding, billTotal, saveNewBill } = useApp();
  const { saveBills, autoSaveTabs } = useSettings();
  const translateY = useSharedValue(-100);

  const backgroundColor = useThemeColor({}, "background");
  const accentColor = useThemeColor({}, "accent");

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardWillShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardWillHide",
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow = () => {
    translateY.value = withTiming(0, { duration: 300 }); // Slide down
  };

  const handleKeyboardHide = () => {
    translateY.value = withTiming(-100, { duration: 300 }); // Slide up
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      <Animated.View
        style={[styles.keyboard, animatedStyle, { backgroundColor }]}>
        <Pressable onPress={Keyboard.dismiss}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </Animated.View>
      <View style={styles.header}>
        <View style={styles.roundContainer}>
          <Switch
            value={isRounding}
            onValueChange={() => setIsRounding(!isRounding)}
          />
          <Text type="defaultSemiBold" style={[styles.roundText]}>
            Round Up
          </Text>
        </View>
        {saveBills && !autoSaveTabs && (
          <TouchableOpacity
            disabled={billTotal === 0 || saved}
            onPress={() => {
              saveNewBill();
              setSaved(true);
            }}
            style={{
              opacity: billTotal === 0 || saved ? 0.5 : 1,
              transitionDuration: "200ms",
              transitionProperty: "opacity",
              transitionTimingFunction: "ease-in-out",
            }}>
            <Text style={[styles.saveBtn, { color: accentColor }]}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "4%",
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
    paddingLeft: sizes.sm,
  },
  keyboard: {
    paddingHorizontal: sizes.sm,
    position: "absolute",
    width: "100%",
    zIndex: 10,
    height: 30,
  },
  close: {
    textAlign: "right",
  },
  saveBtn: {
    fontWeight: "700",
  },
});

export default Header;
