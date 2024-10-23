"use client"

import Header from "../components/header"

export default function HomePage(){
    return(
        <div className="mx-auto max-w-[1440px]" style={{backgroundImage:`url(/images/gradient-bg.jpg)`, backgroundSize:"cover", backgroundRepeat:"no-repeat",}}>
            <Header/>
        </div>
    )
}