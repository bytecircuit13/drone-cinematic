"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navContent } from "../../lib/content";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        // Hide navbar if scrolling down past 50px, reveal if scrolling up
        if (latest > 50 && latest > previous) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent"
        >
            <div className="text-xl tracking-widest font-bold text-white uppercase">
                {navContent.logo}
            </div>
            <button className="text-white text-sm uppercase tracking-widest font-medium hover:bg-white/20 transition-colors bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 shadow-md">
                {navContent.cta}
            </button>
        </motion.nav>
    );
}
