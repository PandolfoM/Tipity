/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#5a3e8e";
const tintColorDark = "#bb9af7";

export const Colors = {
  light: {
    text: "#5a3e8e",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    secondary: "#F6F6F6",
    tertiary: "#F6F6F6",
    accent: "#5a3e8e",
    white: "#5a3e8e",
  },
  dark: {
    text: "#fff",
    background: "#16161d",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    secondary: "#1b1c27",
    tertiary: "#414868",
    accent: "#bb9af7",
    white: "#fff",
  },
};
