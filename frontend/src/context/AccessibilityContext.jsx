import React, { useState, useEffect } from "react";
import { AccessibilityContext } from "./accessibility-context-object";

export default function AccessibilityProvider({ children }) {
    // scale représente un multiplicateur (1 = 100%)
    const [scale, setScale] = useState(1);

    useEffect(() => {
        // applique une variable CSS globale sur <html>
        // on borne la valeur entre 0.7 et 2 pour éviter des trucs cassés
        const bounded = Math.max(0.7, Math.min(scale, 2));
        document.documentElement.style.setProperty('--app-font-scale', `${bounded}`);
    }, [scale]);

    const increase = () => setScale(s => Math.min(2, +(s + 0.1).toFixed(2)));
    const decrease = () => setScale(s => Math.max(0.7, +(s - 0.1).toFixed(2)));
    const reset = () => setScale(1);

    return (
        <AccessibilityContext.Provider value={{ scale, increase, decrease, reset }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
