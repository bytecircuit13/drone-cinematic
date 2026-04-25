"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function ScrollNav() {
    const { scrollYProgress } = useScroll();
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-[40vh] w-[1px] bg-white/10 z-50 hidden md:block">
            <motion.div
                className="w-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                style={{ height }}
            />
        </div>
    );
}
