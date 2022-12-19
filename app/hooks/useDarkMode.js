import colors from "../config/colors";

export default useDarkMode = (colorScheme) => {
  if (colorScheme === "dark") return colors.dark;

  return colors.light;
};
