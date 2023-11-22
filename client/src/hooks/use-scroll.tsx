import {useCallback, useEffect, useState} from "react"


export default function useScroll(threshold: number) {
    const [scrolled, setScrolleed] = useState(false);

    // store react element to cached
    const onScroll = useCallback(() => {
        setScrolleed(window.scrollY > threshold)
    }, [threshold])

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    },[onScroll])

    return scrolled;
}