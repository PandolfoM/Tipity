import { useContext } from "react";
import { useColorScheme } from "react-native";
import colors from "../config/colors";
import DarkContext from "../utils/context";

export default useDarkMode = () => {
  const colorScheme = useColorScheme();
  const { darkMode, setDarkMode } = useContext(DarkContext);

  if (darkMode === "dark") return colors.dark;
  if (darkMode === "light") return colors.light;
  if (darkMode === "auto" && colorScheme === "dark") return colors.dark;
  if (darkMode === "auto" && colorScheme === "light") return colors.light;

  return colors.light;
};
