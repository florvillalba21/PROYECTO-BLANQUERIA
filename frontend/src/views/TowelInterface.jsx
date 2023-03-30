import React from "react";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { Tab } from "../components/layout/Tab";

export const TowelInterface=()=>{
    return(
        <>
        <Navbar/>
        <Tab toalla="nav-link active"/>
        <div className="container toallas">
            
        </div>
        <Footer/>
        </>
    )
}