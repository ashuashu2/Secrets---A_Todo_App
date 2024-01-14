import React, { ReactNode, createContext, useContext, useState } from "react";
import { AuthContextType, AuthType } from "../types/types";


const AuthContext = createContext<AuthContextType | null >(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<AuthType>(false);


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ()  => {
  const context = useContext(AuthContext);
  if( !context ){
    throw new Error("context not found")
  }

  return context
} 
 
