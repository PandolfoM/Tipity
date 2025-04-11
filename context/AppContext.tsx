import storage from "@/utils/storage";
import { SplashScreen } from "expo-router";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Appearance, useColorScheme, View } from "react-native";

interface AppContextProps {
  isRounding: boolean;
  setIsRounding: React.Dispatch<React.SetStateAction<boolean>>;
  split: number | undefined;
  setSplit: React.Dispatch<React.SetStateAction<number | undefined>>;
  themeColor: "auto" | "dark" | "light";
  setThemeColor: React.Dispatch<
    React.SetStateAction<"auto" | "dark" | "light">
  >;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

function useApp(): AppContextProps {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isRounding, setIsRounding] = useState<boolean>(false);
  const [split, setSplit] = useState<number | undefined>(1);
  const [themeColor, setThemeColor] = useState<"auto" | "dark" | "light">(
    "auto"
  );

  useEffect(() => {
    async function prepare() {
      try {
        let value = await storage.getData("darkMode");
        Appearance.setColorScheme(value);
        setThemeColor(value == null ? "auto" : value);
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        isRounding,
        setIsRounding,
        themeColor,
        setThemeColor,
        split,
        setSplit,
      }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {children}
      </View>
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
