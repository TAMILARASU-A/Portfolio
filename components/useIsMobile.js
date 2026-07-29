import { useLayoutEffect, useState } from "react";

export default function useIsMobile(breakpoint = 768) {
    const getInitialMobile = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    };

    const [isMobile, setIsMobile] = useState(getInitialMobile);

    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const update = (event) => setIsMobile(event.matches);

        setIsMobile(mediaQuery.matches);

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", update);
            return () => mediaQuery.removeEventListener("change", update);
        }

        mediaQuery.addListener(update);
        return () => mediaQuery.removeListener(update);
    }, [breakpoint]);

    return isMobile;
}
