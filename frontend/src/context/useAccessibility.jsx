import { useContext } from "react";
import { AccessibilityContext } from "./accessibility-context-object";

export const useAccessibility = () => {
    const ctx = useContext(AccessibilityContext);
    if (!ctx) throw new Error("useAccessibility must be used inside AccessibilityProvider");
    return ctx;
};
