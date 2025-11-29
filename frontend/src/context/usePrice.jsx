import { useContext } from "react";
import { PriceContext } from "./price-context-object";

export function usePrice() {
    return useContext(PriceContext);
}