import { ReactNode, useEffect, useState } from "react";
import { createContext } from "vm";

type Theme= "light"| "dark";
const ThemeContext = createContext();

export function ThemeProvider({children}: {children: ReactNode}){
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const store = localStorage.getItem('theme') as Theme | null;
    },[])
}