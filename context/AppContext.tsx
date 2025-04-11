import storage from "@/utils/storage";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Appearance, useColorScheme } from "react-native";

interface AppContextProps {
  isRounding: boolean;
  setIsRounding: React.Dispatch<React.SetStateAction<boolean>>;
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
  const colorScheme = useColorScheme();

  const [isRounding, setIsRounding] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<"auto" | "dark" | "light">(
    "auto"
  );

  useEffect(() => {
    async function prepare() {
      try {
        let value = await storage.getData("darkMode");
        console.log(value);

        Appearance.setColorScheme(value);
        setThemeColor(value == null ? "auto" : value);
      } catch (error) {
        console.log(error);
      }
    }

    prepare();
  }, []);
  return (
    <AppContext.Provider
      value={{ isRounding, setIsRounding, themeColor, setThemeColor }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
