import axios from "axios";
import React, { useEffect } from "react";

export const Products=({category})=>{
    console.log(category)
    const url= 'http://localhost:3000/Products'

    useEffect(()=>{
        axios.get(url, {
            params: {
              filter: {category}
            }
          }).then(res =>{
            console.log(res)
          })

    },[])
    

    return(
        <>
        </>
    )
}