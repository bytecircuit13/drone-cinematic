"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Softened spring coefficients to provide a highly fluid, silky smooth glide
    const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 });
    const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Centered offset
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY, isVisible]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center backdrop-blur-sm"
            style={{
                x: springX,
                y: springY,
                opacity: isVisible ? 1 : 0,
            }}
        >
            <div className="w-[3px] h-[3px] bg-white rounded-full" />
        </motion.div>
    );
}
