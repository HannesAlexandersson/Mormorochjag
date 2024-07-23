'use client'

import React, { createContext, useState, ReactNode, FC } from 'react'

// Define the shape of the context value
interface MenuContextType {
    showMenu: boolean;
    showBackdrop: boolean;
    toggle: (show: boolean) => void;
}

// Create the context with an initial value of undefined
export const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Define the provider component
interface MenuContextProviderProps {
  children: ReactNode;
  showMenu?: boolean;
 
}

export const MenuContextProvider: FC<MenuContextProviderProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const toggle = (show: boolean) => {
    setShowMenu(show);
    setTimeout(() => setShowBackdrop(show), !show ? 300 : 0);
  };

  return (
    <MenuContext.Provider value={{ showMenu, showBackdrop, toggle }}>
      {children}
    </MenuContext.Provider>
  );
}