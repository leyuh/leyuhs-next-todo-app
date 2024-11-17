"use client"

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BackgroundImage = ({ backgroundImage, backgroundColor }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [backgroundImage])
 
    return <Image
        src={backgroundImage}
        priority
        quality={100}
        alt=""
        sizes="100%"
        fill
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-100 -top-[64px] absolute object-cover object-center`} 
        onLoad={() => setIsLoading(false)}
    />  
}

export default BackgroundImage;