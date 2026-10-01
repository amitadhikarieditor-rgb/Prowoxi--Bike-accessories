import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "../styles/ThemeToggle.css";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("provoxi-theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );

        localStorage.setItem(
            "provoxi-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <button
            type="button"
            className="theme-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle theme"
            title={darkMode ? "Light mode" : "Dark mode"}
        >
            {darkMode ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}