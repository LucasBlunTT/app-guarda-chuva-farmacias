import React, { createContext, useState, ReactNode } from 'react';

// Define a interface para o tipo do contexto
interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Cria o contexto com um valor padrão
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

// Define o tipo das props do AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Cria o Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Estado de login

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
