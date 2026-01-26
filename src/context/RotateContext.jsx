import { createContext, useContext, useState } from "react";

const RotateContext = createContext();

export function RotateProvider({ children }) {
  const [rotated, setRotated] = useState(false);

  const toggleRotate = () => setRotated(prev => !prev);

  return (
    <RotateContext.Provider value={{ rotated, toggleRotate }}>
      {children}
    </RotateContext.Provider>
  );
}

export const useRotate = () => useContext(RotateContext);
