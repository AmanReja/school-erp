import { createContext, useEffect, useState } from "react";

export const LoadDetails = createContext();

export const LoadDetailsProvider = ({ children }) => {
  const [loadD, setLoadD] = useState(false);

  useEffect(() => {
    console.log("✅ LoadD state changed:", loadD);
  }, [loadD]);

  return (
    <LoadDetails.Provider value={{ loadD, setLoadD }}>
      {children}
    </LoadDetails.Provider>
  );
};
