import { createContext, useContext, useState, ReactNode } from "react";

type FaqContextType = {
  faqVisible: boolean;
  setFaqVisible: (visible: boolean) => void;
};

const FaqContext = createContext<FaqContextType | undefined>(undefined);

export const FaqProvider = ({ children }: { children: ReactNode }) => {
  const [faqVisible, setFaqVisible] = useState(false);

  return (
    <FaqContext.Provider value={{ faqVisible, setFaqVisible }}>
      {children}
    </FaqContext.Provider>
  );
};

export const useFaq = () => {
  const context = useContext(FaqContext);
  if (!context) {
    throw new Error("useFaq must be used within a FaqProvider");
  }
  return context;
};
