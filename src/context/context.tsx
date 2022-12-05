import React, { FC, createContext, useState } from "react";

type AppContextType = {
  name: string;
  created: string[];
  vehicles: string[];
  setName: (name: string) => void;
  setCreated: (name: string[]) => void;
  setVehicles: (name: string[]) => void;
};

export const ContextWrapper = createContext<AppContextType | null>(null);

const AppContext: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [created, setCreated] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<string[]>([]);

  return (
    <ContextWrapper.Provider
      value={{ name, created, vehicles, setName, setCreated, setVehicles }}
    >
      {children}
    </ContextWrapper.Provider>
  );
};

export default AppContext;
