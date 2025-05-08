/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');
  
  
  useEffect(() => {
       const savedTheme = localStorage.getItem('theme');
       if(savedTheme){
        setTheme(savedTheme)
       }
    }, [])

      useEffect(() => {
        localStorage.setItem('theme', theme)
      }, [theme])

  const darkTheme = () => {
     setTheme('dark')
  }
  const lightTheme = () => {
    setTheme('light')
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }
 
  return (
    <ThemeContext.Provider value={{theme, darkTheme, lightTheme, toggleTheme}}>
       {children}
    </ThemeContext.Provider>
  )
};

export default function useTheme(){
  return useContext(ThemeContext)
}