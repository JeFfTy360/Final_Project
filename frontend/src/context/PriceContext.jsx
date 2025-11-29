import { useState } from "react";
import { PriceContext } from "./price-context-object";

export default function PriceProvider({ children }) {
    const [price, setPrice] = useState("USD");

    return (
        <PriceContext.Provider value={{ price, setPrice }}>
            {children}
        </PriceContext.Provider>
    );
}
