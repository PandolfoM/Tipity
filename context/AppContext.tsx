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
  service: number | undefined;
  setService: React.Dispatch<React.SetStateAction<number | undefined>>;
  billTotal: number;
  setBillTotal: React.Dispatch<React.SetStateAction<number>>;
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
  const [service, setService] = useState<number | undefined>(18);
  const [billTotal, setBillTotal] = useState<number>(0);
  const [themeColor, setThemeColor] = useState<"auto" | "dark" | "light">(
    "auto"
  );

  useEffect(() => {
    async function prepare() {
      try {
        const [darkMode, split, service, rounding] = await Promise.all([
          storage.getData("darkMode"),
          storage.getData("split"),
          storage.getData("service"),
          storage.getData("rounding"),
        ]);

        Appearance.setColorScheme(darkMode);
        setThemeColor(darkMode == null ? "auto" : darkMode);
        setSplit(split || 1);
        setService(service || 18);
        setIsRounding(rounding || false);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all(
          [
            split !== undefined && storage.storeData("split", split),
            isRounding !== undefined &&
              storage.storeData("rounding", isRounding),
            service !== undefined && storage.storeData("service", service),
          ].filter(Boolean)
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [split, isRounding, service]);

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
        service,
        setService,
        billTotal,
        setBillTotal,
      }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {children}
      </View>
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
