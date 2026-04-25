"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({ text }: { text: string }) {
    // Extract trailing suffix safely (e.g. "54 Min" -> 54, " Min")
    const match = text.match(/^([\d.]+)(.*)$/);

    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });

    useEffect(() => {
        if (isInView && match) {
            motionValue.set(parseFloat(match[1]));
        }
    }, [isInView, match, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current && match) {
                const isFloat = match[1].includes(".");
                const formatted = isFloat ? latest.toFixed(2) : Math.round(latest);
                ref.current.textContent = `${formatted}${match[2]}`;
            }
        });
    }, [springValue, match]);

    if (!match) return <span>{text}</span>;

    return <span ref={ref}>0{match[2]}</span>;
}
