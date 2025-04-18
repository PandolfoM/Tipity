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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColors";
import Switch from "@/components/Switch";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function Header() {
  const { isRounding, setIsRounding } = useApp();
  const backgroundColor = useThemeColor({}, "background");
  const translateY = useSharedValue(-100);

  const closeBar = useAnimatedStyle(() => {
    return {
      height: Math.abs(30),
    };
  }, []);

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
});

export default Header;
