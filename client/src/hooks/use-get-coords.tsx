import { useRef, useState, useEffect } from "react";
import { Coords } from "../shared/type/types";


export default function useGetCoords () {

    const elementRef = useRef(null);
    
    const [coords, setCoords] = useState<Coords>({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    
    const handleGetElementCoords = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const node = e.target as HTMLElement;
    
        const clientRect = node.getBoundingClientRect() as DOMRect;
    
        setCoords({
          x: clientRect.left,
          y: clientRect.top + window?.scrollY,
          width: clientRect.width,
          height: clientRect.height,
        });
    }

    useEffect(() => {
        function handleElemetResize() {
            if(elementRef.current) {
                const node = elementRef.current as HTMLElement;

                const client = node.getBoundingClientRect() as DOMRect;
                setCoords({
                    x: client.left,
                    y: client.top + window?.scrollY,
                    width: client.width,
                    height: client.height,
                });
            }
        }

        window.addEventListener("resize", handleElemetResize);
        // window.addEventListener("scroll", handleElemetResize);


        return () => {
            window.removeEventListener("resize", handleElemetResize);
            // window.removeEventListener("scroll", handleElemetResize);
        };
    }, []);

    return {
        coords,
        elementRef,
        handleGetElementCoords
    };
}