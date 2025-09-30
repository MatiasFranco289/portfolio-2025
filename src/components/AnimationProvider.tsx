"use client";
import { createContext, useContext, ReactNode, useRef, RefObject } from "react";

type AnimationContextType = {
  homeVisited: RefObject<boolean>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

type AnimationProviderProps = {
  children: ReactNode;
};

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const homeVisited = useRef<boolean>(false);

  return (
    <AnimationContext.Provider value={{ homeVisited }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used inside AnimationProvider");
  }
  return context;
};
