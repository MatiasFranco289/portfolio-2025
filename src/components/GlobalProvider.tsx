"use client";
import { API_KEY } from "@/constants";
import { login } from "@/utils";
import {
  createContext,
  useContext,
  ReactNode,
  useRef,
  RefObject,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  homeVisited: RefObject<boolean>;
  appReady: boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [appReady, setAppReady] = useState<boolean>(false);
  const homeVisited = useRef<boolean>(false);

  useEffect(() => {
    async function start() {
      if (localStorage.getItem(API_KEY)) {
        setAppReady(true);
        return;
      }

      await login();
      setAppReady(true);
    }

    start();
  }, []);

  return (
    <GlobalContext.Provider value={{ homeVisited, appReady }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used inside GlobalProvider");
  }

  return context;
};
