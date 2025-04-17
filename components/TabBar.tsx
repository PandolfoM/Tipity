import { View, Platform, StyleSheet } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { useThemeColor } from "@/hooks/useThemeColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import sizes from "@/config/sizes";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const bgColor = useThemeColor({}, "background");
  const secColor = useThemeColor({}, "secondary");
  const whiteColor = useThemeColor({}, "white");
  const accentColor = useThemeColor({}, "accent");

  const icon = {
    index: (props: any) => (
      <MaterialCommunityIcons
        {...props}
        name="calculator"
        size={sizes.flg}
        color={whiteColor}
      />
    ),
    settings: (props: any) => (
      <MaterialCommunityIcons
        {...props}
        name="cog"
        size={sizes.flg}
        color={whiteColor}
      />
    ),
    orders: (props: any) => (
      <MaterialCommunityIcons
        {...props}
        name="receipt"
        size={sizes.flg}
        color={whiteColor}
      />
    ),
  };

  return (
    <View style={[styles.tabBar, { backgroundColor: bgColor }]}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBarItem,
              route.name === "index" && styles.calculator,
              { backgroundColor: route.name === "index" ? accentColor : "" },
            ]}>
            {/* @ts-ignore */}
            {icon[route.name]({
              color: isFocused ? secColor : whiteColor,
            })}
            <Text style={{ color: isFocused ? secColor : whiteColor }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderTopColor: "#000",
    borderTopWidth: 1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  calculator: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 90,
    height: 90,
    position: "absolute",
    left: "50%",
    right: "50%",
    transform: [{ translateX: -50 }, { translateY: -30 }],
  },
});
