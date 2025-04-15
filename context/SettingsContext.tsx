import storage from "@/utils/storage";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { AppState, AppStateStatus, View } from "react-native";

interface SettingsContextProps {
  keepAwake: boolean;
  setKeepAwake: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

function useSettings(): SettingsContextProps {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [keepAwake, setKeepAwake] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        const [keepAwake] = await Promise.all([storage.getData("keepAwake")]);

        setKeepAwake(keepAwake);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        const saveData = async () => {
          try {
            await Promise.all(
              [storage.storeData("keepAwake", keepAwake)].filter(Boolean)
            );
          } catch (error) {
            console.error("Error saving data on app close:", error);
          }
        };
        saveData();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [keepAwake]);

  return (
    <SettingsContext.Provider
      value={{
        keepAwake,
        setKeepAwake,
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings };
