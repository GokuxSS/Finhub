"use client"

import {useMountedState} from "react-use";
import { NewAccountSheet } from "./new-account-sheet";

export function SheetProvider(){
    const isMounted = useMountedState();

    if (!isMounted){
        return null;
    }

    return (
        <>
         <NewAccountSheet />
        </>
    )
}