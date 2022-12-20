import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./app/screens/HomeScreen";
import DarkContext from "./app/utils/context";
import storage from "./app/utils/storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [darkMode, setDarkMode] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        const value = await storage.getData("darkMode");
        setDarkMode(value);
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
    <DarkContext.Provider value={{ darkMode, setDarkMode }}>
      <HomeScreen onLayout={onLayoutRootView} />
    </DarkContext.Provider>
  );
}
