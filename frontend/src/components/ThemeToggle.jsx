import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "../styles/ThemeToggle.css";

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            dark ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );
    }, [dark]);

    const toggleTheme = () => {
        setDark(prev => !prev);
    };

    return (
        <button
            type="button"
            className={`theme-toggle ${dark ? "dark" : "light"}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <span className="theme-icon sun">
                <Sun size={15} />
            </span>

            <span className="theme-icon moon">
                <Moon size={15} />
            </span>

            <span className="theme-thumb" />
        </button>
    );
}